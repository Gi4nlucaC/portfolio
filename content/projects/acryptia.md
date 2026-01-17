+++
date = "2020-09-01"
draft = false
title = "Acryptia"
description = "Acryptia is a strategic dungeon card game, in which players have to beat Rug'O the card dealer to complete floors, climb the leaderboard, and win exclusive prizes."
card_summary = "A strategic dungeon card game with 150K+ matches per season, one of the most popular games in all Web3"
weight = 4
category = "professional"
tags = ["Unity", "Card Game", "WebGL", "Mobile"]
featured_image = "assets/acryptia/acrytpia_cover.png"
gallery = [
  "assets/acryptia/acryptia0.gif",
  "assets/acryptia/acryptia1.webp",
  "assets/acryptia/acryptia2.webp",
  "assets/acryptia/acryptia3.webp",
  "assets/acryptia/acryptia4.webp",
  "assets/acryptia/acryptia5.webp"
]
video = "https://youtu.be/GmP9efkaQUc"
role = "Gameplay Programmer & Technical Game Designer"
engine = "Unity"
language = "C#"
company = "Taco Studios"
status = "Released"
platforms = "WebGL"
links = [
  { label = "Play Game", url = "https://play.acryptia.io/" }
]
+++

## My Role

As a Core Gameplay Programmer, I was responsible for the architectural design of the card battle system and the backend integration. My focus was on creating a secure, server-authoritative environment while pushing the visual boundaries of WebGL through custom shader work and particle integration.

## Key Technical Contributions

### Core Architecture & Design Patterns

- **Scalable Card Logic:** Implemented the Strategy Design Pattern to decouple card behaviors from execution flow. This ensured code maintainability and allowed for the easy addition of new card mechanics without refactoring core systems.
- **Backend Security:** Developed a Server-Authoritative Logic layer utilizing PlayFab and Mirror. Managed critical operations—including deck population, shuffling, and match validation—strictly server-side to prevent client-side manipulation and ensure competitive integrity.

### Graphics & Optimization

- **Dynamic Skinning System:** Created a custom RGB-mask Shader solution to handle UI customization. This allowed UI elements to be recolored at runtime via ScriptableObjects, drastically reducing the build size by eliminating the need for duplicate textures for different skins.
- **UI VFX Integration:** Overcame standard UI limitations by implementing particle systems directly within the Unity 2D Canvas hierarchy, enhancing the "game feel" and visual feedback without sacrificing sorting layer control.

### Tooling & Pipeline

- **Designer Workflow:** Built custom Editor Tools, including a Deck Configurator and balancing utilities. These tools accelerated the content iteration loop, allowing designers to tweak meta-game values without engineering dependency.
