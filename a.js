var document = window.document;
var dumpPre = document.getElementById("dump");
document.addEventListener("keydown", function(event) {
  if (event.ctrlKey || event.altKey) return;
  var shouldPreventDefault = true;
  var key = event.which;
  (function() {
    switch (key) {
      case 0x0d: // Enter and numpad Enter
        return enterPressed();
      case 0x20: // Space
        return roll(3);
      case 0x30:
      case 0x31: // 0-9
      case 0x32:
      case 0x33:
      case 0x34:
      case 0x35:
      case 0x36:
      case 0x37:
      case 0x38:
      case 0x39:
        return numberPressed(key - 0x30);
      case 0x60:
      case 0x61: // numpad 0-9
      case 0x62:
      case 0x63:
      case 0x64:
      case 0x65:
      case 0x66:
      case 0x67:
      case 0x68:
      case 0x69:
        return numberPressed(key - 0x60);
    }
    console.log("0x" + key.toString(16));
    shouldPreventDefault = false;
  })();
  if (shouldPreventDefault) event.preventDefault();
});
var spacebareToggle = ["block", "none"];
document.getElementById("spacebare").addEventListener("mousedown", function flyingSpacebare() {
  document.getElementById("space-bare").style.display = spacebareToggle[0];
  spacebareToggle.reverse();
});
var multiDigitNumber = null;
function numberPressed(n) {
  if (multiDigitNumber != null) {
    multiDigitNumber += n.toString();
    return;
  }
  if (n === 0) {
    // start a multi digit number
    multiDigitNumber = "";
    return;
  }
  // quick roll
  roll(n);
}
function enterPressed() {
  var n = parseInt(multiDigitNumber, 10);
  multiDigitNumber = null;
  if (isNaN(n)) return;
  var limit = 100000;
  if (n >= limit) return println("rolling "+n+" dice is too many. let's keep it under " + limit + ".");
  roll(n);
}
function roll(n) {
  if (n < 30) {
    var result = [];
  } else {
    var distribution = [0, 0, 0, 0, 0, 0];
  }
  var sum = 0;
  for (var i = 0; i < n; i++) {
    var value = randint(1, 6);
    if (result != null) result.push(value);
    if (distribution != null) distribution[value - 1] += 1;
    sum += value;
  }
  var line = sum + " = ";
  if (n > 9) line += "("+n+"d6) = ";
  if (result != null) {
    result.sort();
    line += result.join("+");
  } else if (distribution != null) {
    line += distribution.map(function(n, i) { return n+"("+(i+1)+")"; }).join("+");
  }
  println(line);
}
function randint(lower, upper) {
  return Math.floor(Math.random() * (1 + upper - lower)) + lower;
}
function println(text) {
  dumpPre.textContent += text + "\n";
  dumpPre.scrollTop = dumpPre.scrollHeight;
}
