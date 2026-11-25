#!/usr/bin/env python3
"""Refresh the static catalog from a public playlist and the artist's Videos tab."""
import json, re, subprocess, tempfile
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
CHANNEL = 'UCy-t0ff_XWtwnyno05uniyQ'
PLAYLIST = 'PLsZkJ7GY7SAFx1-vt6QFyLzaWL7_QHl6c'

def fetch(url, payload=None):
    args = ['curl', '--silent', '--show-error', '--fail', '--location', '--retry', '2', '--max-time', '45', '-A', 'Mozilla/5.0', url]
    if payload is not None:
        args += ['-H', 'Content-Type: application/json', '--data-binary', '@-']
    return subprocess.run(args, input=json.dumps(payload) if payload else None, text=True, capture_output=True, check=True).stdout

def walk(value):
    if isinstance(value, dict):
        yield value
        for v in value.values(): yield from walk(v)
    elif isinstance(value, list):
        for v in value: yield from walk(v)

def read_page(url):
    source = fetch(url)
    match = re.search(r'(?:var\s+)?ytInitialData\s*=\s*', source)
    if not match: raise ValueError('YouTube data unavailable; existing catalog preserved')
    data = json.JSONDecoder().raw_decode(source[match.end():])[0]
    contexts = []
    for match in re.finditer(r'ytcfg.set\(', source):
        try: contexts.append(json.JSONDecoder().raw_decode(source[match.end():])[0])
        except ValueError: pass
    context = next((c['INNERTUBE_CONTEXT'] for c in contexts if 'INNERTUBE_CONTEXT' in c), None)
    # Only scan tab content, never sidebar/recommendations.
    tabs = data['contents']['twoColumnBrowseResultsRenderer']['tabs']
    current = next(t['tabRenderer']['content'] for t in tabs if t.get('tabRenderer', {}).get('selected') and 'content' in t['tabRenderer'])
    results, seen_tokens = [], set()
    for _ in range(100):
        for obj in walk(current):
            if 'lockupViewModel' in obj:
                v = obj['lockupViewModel']; ident = v.get('contentId', '')
                title = v.get('metadata', {}).get('lockupMetadataViewModel', {}).get('title', {}).get('content', '')
                if re.fullmatch(r'[\w-]{11}', ident) and title: results.append((ident, title))
            if 'videoRenderer' in obj or 'playlistVideoRenderer' in obj:
                v = obj.get('videoRenderer', obj.get('playlistVideoRenderer'))
                title = ''.join(t.get('text', '') for t in v.get('title', {}).get('runs', []))
                if v.get('videoId') and title: results.append((v['videoId'], title))
        tokens = [command['continuationCommand']['token'] for obj in walk(current) if 'continuationItemRenderer' in obj for command in walk(obj['continuationItemRenderer']) if 'continuationCommand' in command and 'token' in command['continuationCommand']]
        if not tokens: break
        token = tokens[0]
        if not context or token in seen_tokens: raise ValueError('Incomplete pagination; catalog preserved')
        seen_tokens.add(token)
        current = json.loads(fetch('https://www.youtube.com/youtubei/v1/browse', {'context': context, 'continuation': token}))
    else: raise ValueError('Pagination limit; catalog preserved')
    if not results: raise ValueError('Empty YouTube result; catalog preserved')
    return list(dict(results).items())

def sync():
    playlist = dict(read_page('https://www.youtube.com/playlist?list=' + PLAYLIST))
    videos = read_page('https://www.youtube.com/channel/' + CHANNEL + '/videos')
    # Videos tab provides newest-first, non-Shorts uploads belonging to this channel.
    entries = []
    for ident, title in videos:
        if ident not in playlist or re.search(r'#shorts\b', title, re.I): continue
        title = re.sub(r'^하나사키\s*시온(?:\([^)]*\))?\s*-\s*', '', title)
        entries.append({'channelId': CHANNEL, 'id': ident, 'title': title, 'artist': '하나사키 시온'})
    if not entries: raise ValueError('No matching music; catalog preserved')
    target = ROOT / 'dist' / 'content.js'
    old = target.read_text()
    start = old.index('const music = ') + len('const music = ')
    previous, length = json.JSONDecoder().raw_decode(old[start:])
    others = [item for item in previous if item.get('channelId') != CHANNEL]
    # Keep future artists intact. This source currently owns only Sion music.
    updated = old[:start] + json.dumps(entries + others, ensure_ascii=False, indent=2) + old[start + length:]
    if updated == old:
        print(json.dumps({'changed': False, 'songs': len(entries)})); return
    with tempfile.NamedTemporaryFile('w', dir=target.parent, delete=False) as temp:
        temp.write(updated); name = temp.name
    Path(name).replace(target)
    print(json.dumps({'changed': True, 'songs': len(entries), 'playlist': PLAYLIST}))

if __name__ == '__main__': sync()
