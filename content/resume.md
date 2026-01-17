+++
date = '2026-01-07T18:55:18+01:00'
draft = false
title = 'Resume'
+++

I am Gianluca Camarca, a Gameplay Programmer and Technical Game Designer with over 4 years of experience in the industry. Currently serving as a Lead XR Developer and Lecturer, I specialize in architecting scalable gameplay systems, authoritative networking, and VR interactions. I combine a strong engineering background with design sensibility to bridge the gap between complex code and engaging player experiences.

[Download Resume as PDF](#) | [Linkedin](https://www.linkedin.com/in/your-profile) | [Github](https://github.com/your-username) | [Email](mailto:your.email@example.com)

## WORK HISTORY

<div class="job-header">
<h4 class="job-title">Gameplay Programmer & Technical Designer <span class="job-date">2022 - Present</span></h4>
<p class="job-company">@ Taco Studios</p>
</div>

Responsible for core gameplay implementation, networking architecture, and tool development across multiple shipping titles.

_Polyverse_ (Multiplayer Isometric Action RPG)

- **Engineered a Server-Authoritative Networking Architecture** using **Mirror** and **PlayFab**. Implemented advanced **Client-Side Prediction and Server Reconciliation** to ensure lag-free movement and prevent cheating in a token-based economy.
- **Wrote a deterministic Custom A\* Pathfinding algorithm** and Behavior Tree system from scratch, bypassing Unity’s standard NavMesh to guarantee perfectly synchronized enemy movement across all clients.
- **Developed a Custom Kinematic Character Controller** to handle non-standard gravity logic and stair traversal, coupled with an animation state machine featuring **Inverse Kinematics (IK)**.
- **Extended the Universal Render Pipeline (URP)** by writing a custom Render Feature/Pass to achieve an "X-Ray" silhouette effect for characters occluded by geometry.
- **Created a Data-Driven Gameplay Framework** using ScriptableObjects, empowering designers to balance weapons and stats independently.

_Mars Kitchen_ (VR Cooking Simulation)

- **Architected a seamless "Endless Mode"** by implementing a custom **Runtime Lightmap Swapping** system, allowing instant environment changes without scene reloading.
- **Engineered an AI Virtualization System** to simulate off-screen customer behavior and orders, maintaining game state consistency with minimal performance cost.
- **Owned the PlayStation VR porting and certification pipeline**, successfully navigating Sony's TRC requirements to launch on the PlayStation Store.
- **Acted as Technical Designer**, prototyping and implementing complex mechanics (e.g., "Black Hole" physics, gesture-based minigames) and a robust localization system for 5 languages.

_Acryptia_ (Web3 Roguelite Card Game)

- **Implemented the Strategy Design Pattern** to handle complex card logic and execution flow, ensuring code scalability and maintainability.
- **Developed a Server-Authoritative Logic layer** on PlayFab/Mirror, managing deck population, shuffling, and match validation server-side to ensure security.
- **Created a Dynamic Skinning System** using custom **RGB-mask Shaders**, allowing UI elements to be recolored at runtime via ScriptableObjects, significantly reducing asset size.
- **Built custom Designer Tools**, including a Deck Configurator and balancing tools, to accelerate content iteration.
- **Solved UI limitations** by implementing particle systems directly within the 2D Canvas for enhanced game feel ("juice").

---

<div class="job-header">
<h4 class="job-title">Lead XR Developer <span class="job-date">2023 - Present</span></h4>
<p class="job-company">@ Elite Division</p>
</div>

responsible for the full-cycle development of a large-scale metaverse infrastructure for a high-profile government client.

_Metaverse - Regione Lombardia_ (XR/Metaverse Experience)

- **Architected a Cross-Platform RTC system** integrating **LiveKit** with Unity. Successfully bridged native SDKs with WebGL-specific libraries (JavaScript interop) to enable seamless Voice, Video, and Screensharing across desktop and web clients.
- **Engineered the core networking architecture** using **Netcode for GameObjects**, managing avatar synchronization and state replication for a multi-user environment.
- **Executed an aggressive optimization strategy** to guarantee high framerates on constrained devices (WebGL/Mobile), implementing strict asset pipelines, static/dynamic batching, and occlusion culling.
- **Took full ownership** of the technical pipeline, working autonomously to deliver a complex, scalable product from concept to deployment.

---

<div class="job-header">
<h4 class="job-title">Lecturer (Unreal Engine) <span class="job-date">2025 - Present</span></h4>
<p class="job-company">@ RUFA - Rome University of Fine Arts</p>
</div>

- **Designed and delivered an intensive Unreal Engine 5 bootcamp** for the "Interactive Systems 2" course (3rd Year Digital Arts program).
- **Bridged the gap between Art and Engineering**, teaching complex technical architectures—including **Behavior Trees**, **Animation Blueprints**, and **Niagara Systems**—to a design-focused audience.
- **Empowered functional prototyping:** Mentored students on how to translate artistic visions into playable mechanics, fostering technical independence in future technical artists.

## EDUCATION

**High School Diploma: Computer Science**
ITIS Enrico Fermi, Rome | _Grade: 90/100_

## CERTIFICATIONS & COURSES

**Unreal Engine Fellowship 2024** - _Epic Games_
_Selected for the prestigious intensive training program by Epic Games, mastering advanced Unreal Engine workflows, rendering pipelines, and production standards._

**Other Certifications:**

  _(See my full badge collection on [Credly/YourLink])_

{{ partial "certification-badges.html" . }}

## TECH SKILLS

- **Languages:** C#, C++, Python, JavaScript (WebGL Interop), HLSL/Shader Graph.
- **Engines:** Unity (Expert), Unreal Engine 5 (Fellowship Graduate).
- **Networking:** Mirror, Netcode for GameObjects, PlayFab, Photon, LiveKit, Prediction/Reconciliation.
- **Architecture:** Strategy Pattern, State Machines, Behavior Trees, MVC, ScriptableObject Architecture.
- **Gameplay:** Custom Character Controllers, 3C (Character/Camera/Control), A\* Pathfinding, Inverse Kinematics.
- **Graphics/VR:** URP Render Features, Niagara VFX, Oculus/Meta SDK, OpenXR, VR Optimization, Linear Algebra.
- **Tools:** Git, Visual Studio, RenderDoc, PlasticSCM.

## SOFT SKILLS

- **Technical Leadership:** Proven ability to take ownership of complex projects and lead architecture decisions.
- **Communication:** Expert in communicating complex technical concepts to Designers and Artists (Teaching experience).
- **Creative Problem Solving:** Expertise in finding technical solutions to ambitious design requirements (Technical Game Design).
- **Console Development:** Experience with Sony TRC and certification processes.

## PORTFOLIO

See my projects in detail on [this page](/projects).
