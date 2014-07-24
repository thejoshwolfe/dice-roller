var dumpPre;
window.addEventListener("load", function() {
  var document = window.document;
  dumpPre = document.getElementById("dump");
  document.addEventListener("keydown", function(event) {
    if (event.ctrlKey || event.altKey) return;
    var shouldPreventDefault = true;
    var char = String.fromCharCode(event.which);
    if ("1" <= char && char <= "9") {
      roll(parseInt(char));
    } else if (char === " ") {
      roll(3);
    } else {
      shouldPreventDefault = false;
    }
    if (shouldPreventDefault) event.preventDefault();
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
});
