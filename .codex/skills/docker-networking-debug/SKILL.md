---
name: docker-networking-debug
description: "Playbook for docker-networking-debug. Use when debugging container networking (DNS, ports, bridge/host, localhost pitfalls, Mac/Windows differences) with evidence."
---

# docker-networking-debug (Playbook)

Use this for networking problems inside Docker/Compose: DNS resolution, service discovery, ports, and host/container boundary issues.

## When to use (triggers)
- Container can’t reach another service (DB, API).
- Host can’t reach a container (ports not exposed, bind issues).
- “localhost” confusion (inside container vs host).

## Inputs / Outputs
- Inputs: compose file/network config, target connection (from→to), error messages, platform (Linux/macOS/Windows).
- Outputs: root cause + minimal fix + verification commands.

## Step sequence (Map -> Test -> Fix -> Verify)
1) Map
   - Identify networks and service names.
   - Confirm published ports vs internal ports.
2) Test
   - From host:
     - `curl -v http://localhost:<port>`
     - `nc -vz localhost <port>`
   - From container:
     - `docker exec -it <c> sh -lc 'getent hosts service || nslookup service'`
     - `docker exec -it <c> sh -lc 'curl -v http://service:port'`
3) Fix
   - Prefer service-name DNS inside compose networks (`http://db:5432`).
   - Bind to `0.0.0.0` inside containers when exposing to host.
4) Verify
   - Re-run connectivity checks from both sides.

## Common pitfalls
- App binds to `127.0.0.1` inside container (host can’t reach it).
- Using `localhost` to refer to another container (wrong).
- CORS misinterpreted as network failure (browser-level vs network-level).
- macOS/Windows host networking differences (no `--network=host` parity).

## Templates
- Connectivity checklist: `references/connectivity-checklist.md`
- Debug log: `assets/network-debug-log.md`

## Definition of Done
- Connectivity works for the intended paths (host→container and/or container→container).
- Fix is minimal and documented.
- Verification steps are recorded.
