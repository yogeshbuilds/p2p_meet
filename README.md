# p2p_meet
A Full Stack Application build for Peer to Peer Video Chats.

# 1. Overall System Architecture

> What components exist?

```text
                           Internet
                               │
         ┌─────────────────────┴─────────────────────┐
         │                                           │
    React Client A                             React Client B
         │                                           │
         ├──────────── HTTPS + WebSocket ────────────┤
         │                                           │
         └───────────────────────────────────────────┘
                               │
                    Node.js + Express + Socket.IO
                               │
                    ┌─────────────────────┐
                    │                     │
                 REST APIs           Signaling Events
                    │                     │
                    └─────────────────────┘
                               │
                          PostgreSQL
                               │
                     Users / Meetings
```

---

# 2. Signaling Architecture

> How do peers discover each other?

```text
                     Socket.IO Signaling Server
                               │
          ┌────────────────────┴────────────────────┐
          │                                         │
      Browser A                                Browser B
          │                                         │
          │------------- offer -------------------->│
          │<------------ answer --------------------│
          │------------- ICE candidate ------------>│
          │<------------ ICE candidate -------------│
          │                                         │
```

### Signaling Responsibilities

The signaling server is responsible for:

- User joins a room
- User leaves a room
- Exchanging SDP offers
- Exchanging SDP answers
- Exchanging ICE candidates

### Important

Only signaling data passes through the server.

No:

- Video
- Audio
- Screen sharing

flow through the server.

---

# 3. Media Architecture

This answers:

> How does video actually travel?

```text
              Camera                     Camera
                 │                           │
          MediaStream                  MediaStream
                 │                           │
         RTCPeerConnection         RTCPeerConnection
                 │                           │
                 └──────── Encrypted SRTP ───┘
                             (UDP)
```

### Media Flow

```text
Camera
  ↓
MediaStream
  ↓
RTCPeerConnection
  ↓
Internet
  ↓
RTCPeerConnection
  ↓
Remote Video Element
```

### Media Responsibilities

WebRTC is responsible for:

- Video streaming
- Audio streaming
- Packet encryption
- Packet transmission
- Packet reception
- Synchronization

### Security

Media traffic is secured using:

- DTLS (Datagram Transport Layer Security)
- SRTP (Secure Real-Time Transport Protocol)

### Important

After the peer connection is established:

```text
Browser A ◄──────────────► Browser B
```

Media travels directly between browsers.
