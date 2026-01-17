+++
date = '2026-01-15'
draft = false
title = 'Metaverse — Regione Lombardia'
description = "A public-facing metaverse experience for Regione Lombardia enabling cultural showcases, civic engagement, and immersive events across virtual civic spaces. Built for accessibility and extensibility."
card_summary = "Public metaverse for Regione Lombardia — cultural spaces and civic events"
weight = 3
category = 'professional'
tags = ['Unity', 'Crossplatform', 'Metaverse']
featured_image = 'assets/metaverse-lombardia/cover.jpg'
gallery = [
  'assets/metaverse-lombardia/space1.jpg',
  'assets/metaverse-lombardia/space2.jpg',
  'assets/metaverse-lombardia/space3.jpg',
  'assets/metaverse-lombardia/space4.png',
  'assets/metaverse-lombardia/space5.jpg'
]
video = ''
role = 'Lead XR Developer'
engine = 'Unity'
language = 'C#'
company = 'Elite Division'
status = 'Released'
platforms = 'Crossplatform: WebGL, Standalone, VR, Mobile'
links = [
  { label = "Website", url = "https://eventi.regione.lombardia.it/it/metaverso" }
]
+++

## Overview

Metaverse — Regione Lombardia is a pioneering digital initiative by the Lombardy Region, designed to bring citizens closer to public institutions through immersive technology. This virtual environment allows users to explore interactive digital spaces, participate in events, and discover Lombardy's rich cultural heritage—breaking down physical barriers and enabling new forms of engagement.

Within the Metaverse, users can create personalized avatars, meet others, visit virtual exhibitions, and attend public events. Notably, the platform features a digital recreation of Piazza Città di Lombardia, offering a safe and privacy-respecting space for shared experiences. The debut exhibition, "Incontri nel Metaverso – Tradizioni e saperi lombardi," developed in collaboration with the Archive of Ethnography and Social History (AESS), celebrates the region's traditions and roots through objects and stories.

Launched in December 2024, the Metaverse is accessible via PC, VR headsets, and mobile devices. Participation requires online registration, avatar creation, and time slot selection, ensuring a unique and engaging experience for all. This project marks a new channel of communication between citizens and institutions, leveraging the Metaverse as an innovative tool for cultural and institutional content sharing. Ongoing development aims to further enhance features and performance, making the experience even more engaging in the future.

## My Role

I held full ownership of the technical lifecycle for this high-profile government project, operating as the Lead Architect and Developer. I managed the project from concept to deployment, ensuring the infrastructure met the scalability and accessibility standards required for a public sector metaverse application.

## Key Technical Contributions

### Cross-Platform RTC Architecture

- **LiveKit Integration:** Architected a custom Real-Time Communication (RTC) system integrating LiveKit with Unity.
- **WebGL Interoperability:** Successfully bridged native SDKs with WebGL-specific libraries using low-level JavaScript interop. This enabled seamless Voice, Video, and Screensharing capabilities across both desktop applications and browser-based clients without relying on external plugins.

### Multiplayer Infrastructure

- **Netcode Implementation:** Engineered the core networking architecture using Unity's Netcode for GameObjects.
- **State Management:** Managed complex avatar synchronization and state replication logic to maintain consistency in a multi-user environment, ensuring smooth interactions even under varying network conditions.

### Optimization Strategy

- **WebGL & Mobile Performance:** Executed an aggressive optimization strategy to guarantee high framerates on constrained devices.
- **Rendering Pipeline:** Implemented strict asset pipelines, utilized extensive static/dynamic batching, and configured occlusion culling to minimize draw calls and manage memory usage effectively in a browser environment.
