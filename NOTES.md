# Self-Driving Car — Project Notes

A personal reference for understanding what's going on in this project.
Come back here whenever something feels confusing.

---

## What is this project?

We're building a car that teaches itself to drive — without us telling it the rules.
It uses a **neural network** (a simple brain) that starts out completely random,
and gets better over time through **evolution**: keep the best brain, throw away the rest, repeat.

The whole thing runs in the browser using vanilla JavaScript and an HTML5 canvas. No libraries.

---

## The files and what they do

| File | What it does |
|---|---|
| `main.js` | Starts everything. Creates the road, cars, and runs the animation loop |
| `car.js` | The car — movement, steering, collision detection, damage |
| `controls.js` | Keyboard input (KEYS), always-forward (DUMMY), or neural network (AI) |
| `road.js` | Draws the road and provides lane positions and border coordinates |
| `sensor.js` | Casts rays forward from the car to detect walls and traffic |
| `network.js` | The brain — the neural network that decides how to drive |
| `visualizer.js` | Draws the brain on screen so you can see it thinking |
| `utils.js` | Helper math functions used by everyone else |

---

## How the car moves

The car doesn't move on a grid — it moves like a real vehicle using physics:

- **Acceleration** — pressing forward increases speed gradually
- **Friction** — the car slows down on its own when you stop pressing
- **Max speed** — speed is capped so it doesn't go forever
- **Angle-based steering** — turning changes the car's angle, and it moves in that direction
- **Polygon collision** — the car is represented as a rotatable rectangle (4 corner points).
  When any edge of that rectangle crosses a wall or another car, it counts as a crash.
  The car then turns gray and freezes.

---

## The sensors

The car has **10 rays** that shoot forward like a flashlight.
Each ray travels up to 150 units and stops when it hits something (a wall or another car).

- If a ray hits nothing → sensor value is **0**
- If a ray hits something far away → sensor value is **small** (e.g. 0.2)
- If a ray hits something very close → sensor value is **close to 1**

These 10 values are the car's only way of "seeing" the world.
They get fed directly into the neural network as inputs.

---

## The neural network (the brain)

Think of it like a chain of decisions.

```
Sensors (10)  →  Hidden layer (6)  →  Outputs (4)
```

The **4 outputs** are: forward, left, right, reverse.
Each output is either ON (1) or OFF (0).

### The dots in the visualizer

- **Bottom row of dots** = the 10 sensor rays
  - Bright yellow = something is close
  - Dark = nothing nearby

- **Middle row of dots** = 6 hidden neurons
  - They mix the sensor signals together and pass a result upward
  - You don't control these directly — the network figures them out

- **Top row of dots** = the 4 driving outputs
  - Bright = that action is ON right now (e.g. turning left)
  - Dark = that action is OFF

### The lines between dots (weights)

Every dot is connected to the next layer by lines called **weights**.

- **Yellow line** = positive connection → "when this input fires, push the output ON"
- **Blue line** = negative connection → "when this input fires, push the output OFF"
- **Thick/bright** = strong connection
- **Thin/faint** = weak connection

### The dashed ring around output dots (bias)

The bias is like a threshold — how strong does the signal need to be before the neuron fires?
- High bias = hard to activate (needs a lot of input)
- Low/negative bias = easy to activate (fires even with weak input)

### How a neuron decides to fire

For each output neuron:
1. Take every input, multiply it by its weight, add them all up
2. Compare that sum to the bias
3. If `sum > bias` → output is **1** (fires)
4. If `sum ≤ bias` → output is **0** (stays quiet)

That's it. Simple math, repeated across all the neurons.

---

## Why does the car drive randomly at first?

Because all the weights and biases start as **random numbers between -1 and 1**.
The network doesn't know anything yet — it's like a newborn.
Some random brains will accidentally drive forward for a bit. Most will crash immediately.

---

## Saving and loading the best brain

The 📇 (save) and 🗑️ (discard) buttons let you keep progress between sessions.

- **Save** — takes the brain of whichever car is currently furthest ahead and writes it to `localStorage`. This survives page refreshes.
- **Discard** — deletes the saved brain so the next run starts completely fresh.

On startup, if a saved brain exists it is automatically loaded into the first car.
The other 99 cars still start with random (mutated) brains — so the population keeps exploring new possibilities while the best one is preserved.

**Why localStorage?**
It's built into the browser — no server or database needed. It stores simple text (JSON), and `JSON.stringify` / `JSON.parse` are used to convert the brain object to text and back.

---

## What comes next — mutation and evolution

This is where it gets interesting.

1. Create **many cars** at once (e.g. 100), each with a slightly different random brain
2. Let them all drive at the same time
3. The one that gets the furthest before crashing = the **best brain**
4. Save that brain
5. Create the next generation by **mutating** it — copy the best brain but nudge the weights slightly
6. Repeat

Over many generations, the car gets better and better — not because we programmed the rules,
but because the survivors passed on their (slightly improved) brain.

This is called a **genetic algorithm** — survival of the fittest, but for code.

---

## Common errors and what they mean

| Error | What it usually means |
|---|---|
| `X is not defined` | The file containing X isn't loaded in `index.html`, or there's a typo in the name |
| `Cannot read properties of undefined` | You're accessing something on a variable that is `null` or `undefined` — check the name (e.g. `car` vs `Car`) |
| Car stands still | The brain or controls aren't wired up, or there's a crash before the animation starts |
| Only a tiny bit of road visible | A JS crash happened before `canvas.height` was set — check the console for the real error |

---

## Key concepts in plain English

**lerp (linear interpolation)** — smoothly go from value A to value B.
`lerp(0, 100, 0.3)` = 30. Used everywhere for positioning things on screen.

**Canvas coordinates** — top-left is (0,0). X goes right, Y goes **down**.
So to move the car "up" the road, we subtract from Y.

**ctx** — the drawing pen for the canvas. `canvas` is the whiteboard, `ctx` is the marker.

**Polygon** — the car isn't a circle or a point, it's a rotatable 4-corner shape.
This lets us do accurate collision detection even when the car is turning.

**feedForward** — passing data through the network from inputs to outputs.
Each layer takes the previous layer's output as its input.
