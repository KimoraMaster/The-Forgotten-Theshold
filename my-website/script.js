// script.js
let inventory = [];
let sanity = 100;
let luck = Math.floor(Math.random() * 100);

const storyText = document.getElementById("story");
const choicesDiv = document.getElementById("choices");
const statsText = document.getElementById("stats");

const story = {
  start: {
    text: "You wake up in a dusty bedroom. The house groans with age. There's a door slightly open.",
    choices: [
      { text: "Leave the room", next: "hallway" },
      { text: "Look under the bed", next: "underBed" }
    ]
  },
  hallway: {
    text: "The hallway is dark. The wallpaper peels like dead skin. At the end is a door glowing faintly.",
    choices: [
      { text: "Go to the glowing door", next: "portalRoom" },
      { text: "Explore the bathroom", next: "bathroom" }
    ]
  },
  underBed: {
    text: "You find a strange old key covered in dust. It might be important.",
    choices: [
      { text: "Take the key and leave the room", next: "hallway", action: () => inventory.push("key") }
    ]
  },
  bathroom: {
    text: "The mirror is cracked. You see yourself... and something behind you. You turn, but nothing's there.",
    choices: [
      { text: "Run to the glowing door", next: "portalRoom", action: () => sanity -= 10 }
    ]
  },
  portalRoom: {
    text: "You enter a room filled with swirling fog. A mirror shows a strange, vibrant world. You step through...",
    choices: [
      { text: "Enter the strange world", next: "wonderlandEntrance" }
    ]
  },
  wonderlandEntrance: {
    text: "You're in a twisted forest. The trees whisper. A creature with a stitched smile approaches.",
    choices: [
      { text: "Talk to the creature", next: "creatureTalk" },
      { text: "Hide behind a tree", next: "hideTree" }
    ]
  },
  creatureTalk: {
    text: `\"Welcome, stranger,\" it grins. \"This world eats fear. What are you afraid of?\"`,
    choices: [
      { text: `\"I'm not afraid of anything.\"`, next: "braveryPath", action: () => sanity += 10 },
      { text: `\"Losing my mind.\"`, next: "fearPath", action: () => sanity -= 10 }
    ]
  },
  hideTree: {
    text: "The creature sniffs the air and vanishes. But now the trees are staring at you. The forest is awake.",
    choices: [
      { text: "Run deeper into the forest", next: "forestRun" },
      { text: "Climb a tree", next: "treeClimb" }
    ]
  },
  braveryPath: {
    text: "The creature bows. 'You may pass, fearless one.' It vanishes in a puff of smoke. A golden gate appears.",
    choices: [
      { text: "Enter the gate", next: "treasureEnding" }
    ]
  },
  fearPath: {
    text: "The creature laughs, and your vision blurs. The trees close in, whispering. Your sanity fades...",
    choices: [
      { text: "Scream and run", next: "insanityEnding" }
    ]
  },
  forestRun: {
    text: "You trip on a root and fall into a pit. It's filled with bones. Something moves below you...",
    choices: [
      { text: "Climb out quickly", next: "portalRoom", action: () => sanity -= 5 }
    ]
  },
  treeClimb: {
    text: "You see the layout of the forest. A tower in the distance. But something is climbing up after you...",
    choices: [
      { text: "Jump down and run", next: "portalRoom", action: () => luck -= 10 }
    ]
  },
  treasureEnding: {
    text: "You find a treasure chest filled with light. You are free. The adventure ends... for now.",
    choices: []
  },
  insanityEnding: {
    text: "Your mind shatters. You become one with the forest. Another whispering tree among many.",
    choices: []
  }
};

function showNode(nodeKey) {
  const node = story[nodeKey];
  storyText.textContent = node.text;
  choicesDiv.innerHTML = "";
  node.choices.forEach(choice => {
    const button = document.createElement("button");
    button.textContent = choice.text;
    button.onclick = () => {
      if (choice.action) choice.action();
      showNode(choice.next);
    };
    choicesDiv.appendChild(button);
  });
  updateStats();
}

function updateStats() {
  statsText.innerHTML = `🧠 Sanity: ${sanity} | 🎲 Luck: ${luck} | 🎒 Inventory: ${inventory.join(", ") || "Empty"}`;
}

showNode("start");
