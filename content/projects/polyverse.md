+++
date = '2019-06-01'
draft = false
title = 'Polyverse'
description = "After an alien invasion and an attempt to defend with AI and military cyborgs, the AI turns hostile causing a nuclear apocalypse. The mutated world hosts five races (Alien, Human, Cyborg, Ape, Mutant) fighting for resources and survival; initially living in shelters as society rebuilds."
card_summary = "An Action Rpg Shooter set in a post-apocalyptic Earth"
weight = 2
category = 'professional'
tags = ['Unity','ARPG', 'Web3', 'Beta Release']
featured_image = 'assets/polyverse/polyverse_main.jpg'
gallery = [
	'assets/polyverse/poly.png',
	'assets/polyverse/poly2.png',
	'assets/polyverse/poly3.png',
	'assets/polyverse/poly4.jpg'
]
video = 'https://youtu.be/-iuIlTpDrng'
role = 'Gameplay Programmer'
engine = 'Unity'
language = 'C#'
company = 'Taco Studios'
status = 'Beta Release'
platforms = 'WebGL'
links = []
+++

## My Role

I acted as the Core Systems Architect, responsible for designing the fundamental multiplayer infrastructure and custom physics implementations. My primary focus was on ensuring deterministic simulation for networked gameplay and extending Unity's rendering pipeline to meet specific visual requirements.

## Key Technical Contributions

### Multiplayer Architecture & Security

- **Server-Authoritative Networking:** Engineered a robust architecture using Mirror and PlayFab. Implemented advanced Client-Side Prediction and Server Reconciliation techniques to ensure lag-free movement while maintaining strict server authority to prevent cheating in the game's token-based economy.
- **Deterministic Simulation:** Wrote a custom deterministic A\* Pathfinding algorithm and Behavior Tree system from scratch. By bypassing Unity’s standard non-deterministic NavMesh, I guaranteed perfectly synchronized enemy movement across all clients, eliminating desync issues common in networked PvE games.

### Physics & Controls

- **Custom Kinematic Controller:** Developed a bespoke Kinematic Character Controller to handle non-standard gravity logic and complex stair traversal, areas where the default physics engine often struggles.
- **Procedural Animation:** Integrated the controller with an animation state machine featuring Inverse Kinematics (IK) for grounded foot placement and realistic interactions.

### Graphics Programming

- **URP Extension:** Extended the Universal Render Pipeline (URP) by writing a custom Render Feature and Render Pass. This achieved an "X-Ray" silhouette effect for characters occluded by geometry, enhancing gameplay clarity without sacrificing visual fidelity.

### Gameplay Framework

- **Data-Driven Design:** Created a modular framework using ScriptableObjects, allowing game designers to balance weapon stats and gameplay variables independently, decoupling content creation from engineering tasks.
