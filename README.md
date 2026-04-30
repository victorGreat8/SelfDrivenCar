# Self-Driving Car

A self-driving car simulation built in vanilla JavaScript, using an HTML5 canvas.

Built by following the tutorial series by [Radu Mariescu-Istodor](https://www.youtube.com/@Radu) on YouTube.

## Features (so far)
- Car movement with acceleration, friction, and max speed
- Steering with angle-based turning
- Road rendering with lane markings
- Camera that follows the car
- Sensor rays that detect road borders and traffic cars
- Polygon-based collision shape that rotates with the car
- Damage detection — car turns gray when it hits a road border or traffic car
- Traffic system with dummy cars that drive straight
- Neural network brain that controls the AI car
- 100 AI cars simulated simultaneously, camera follows the furthest one
- Neural network visualizer showing weights, biases, and live activations
- Sensor lines only shown on the lead car
- Save/discard buttons to store the best brain in localStorage between sessions

## Controls
| Key | Action |
|-----|--------|
| Arrow Up | Accelerate |
| Arrow Down | Reverse |
| Arrow Left | Steer left |
| Arrow Right | Steer right |

## How to run
Open `index.html` in a browser (use a local server like VS Code Live Server).

## Notes / What I learned

**What is `ctx`?**

`ctx` (short for "context") is the drawing tool for the canvas. Think of it like:
- `canvas` = the whiteboard
- `ctx` = the marker/pen you draw with

You get it by calling `canvas.getContext("2d")`, which gives you all the drawing methods like `ctx.rect()`, `ctx.fill()`, `ctx.translate()` etc.

**Canvas coordinate system**

The top-left corner of the canvas is `(0, 0)`:
- `x` increases going right →
- `y` increases going down ↓

So subtracting from `y` moves the car up, and adding moves it down. It feels backwards at first but that's just how canvas works.
