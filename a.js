var document = window.document;
var dumpPre = document.getElementById("dump");
document.addEventListener("keydown", function(event) {
  if (event.ctrlKey || event.altKey) return;
  var shouldPreventDefault = true;
  var key = event.which;
  (function() {
    switch (key) {
      case 0x20: // Space
        return roll(3);
      case 0x31: // 1-9
      case 0x32:
      case 0x33:
      case 0x34:
      case 0x35:
      case 0x36:
      case 0x37:
      case 0x38:
      case 0x39:
        return roll(key - 0x30);
      case 0x61: // numpad 1-9
      case 0x62:
      case 0x63:
      case 0x64:
      case 0x65:
      case 0x66:
      case 0x67:
      case 0x68:
      case 0x69:
        return roll(key - 0x60);
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
function roll(n) {
  var result = [];
  var sum = 0;
  for (var i = 0; i < n; i++) {
    var value = randint(1, 6);
    result.push(value);
    sum += value;
  }
  result.sort();
  var line = sum + " = " + result.join("+");
  println(line);
}
function randint(lower, upper) {
  return Math.floor(Math.random() * (1 + upper - lower)) + lower;
}
function println(text) {
  dumpPre.textContent += text + "\n";
  dumpPre.scrollTop = dumpPre.scrollHeight;
}
