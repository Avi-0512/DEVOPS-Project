// ─────────────────────────────────────────────
//  clock.js  –  Digital Watch
//  Uses the original clockRotation() logic
//  extended for a full digital display.
// ─────────────────────────────────────────────

// Helper: zero-pad numbers
function pad(n) {
    return String(n).padStart(2, "0");
}

// Helper: pad milliseconds to 3 digits
function padMs(n) {
    return String(n).padStart(3, "0");
}

// Day & Month name arrays
var DAYS   = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// ── Original clockRotation function (from your code) ──
// Extended to also drive the digital watch UI.
function clockRotation() {
    setInterval(function () {

        var date    = new Date();
        var seconds = date.getSeconds();
        var minutes = date.getMinutes();
        var hours   = date.getHours();

        // ── Original rotation calculations (kept as-is) ──
        var secondsRotation = seconds * 6;
        var minutesRotation = minutes * 6;
        var hoursRotation   = hours * 30 + minutes / 2;

        // ── Original jQuery CSS calls (kept as-is) ──
        $("#seconds").css({
            "-webkit-transform": "rotate(" + secondsRotation + "deg)",
            transform: "rotate(" + secondsRotation + "deg)"
        });
        // (If you add analog hands later, wire these up)
        $("#minutes").css({
            "-webkit-transform": "rotate(" + minutesRotation + "deg)",
            transform: "rotate(" + minutesRotation + "deg)"
        });
        $("#hours").css({
            "-webkit-transform": "rotate(" + hoursRotation + "deg)",
            transform: "rotate(" + hoursRotation + "deg)"
        });

        // ── Digital watch display ──
        var h12  = hours % 12 || 12;
        var ampm = hours < 12 ? "AM" : "PM";

        document.getElementById("hh").textContent = pad(h12);
        document.getElementById("mm").textContent = pad(minutes);
        document.getElementById("ss").textContent = pad(seconds);
        document.getElementById("ampm").textContent = ampm;

        // Seconds progress bar (0-100%)
        document.getElementById("seconds-bar").style.width = (seconds / 59 * 100) + "%";

        // Date string
        var d = date.getDate();
        var mo = MONTHS[date.getMonth()];
        var yr = date.getFullYear();
        document.getElementById("day-name").textContent = DAYS[date.getDay()];
        document.getElementById("date-str").textContent = d + " " + mo + " " + yr;

        // Colon blink — synced to seconds (on even, off odd)
        var colonVisible = seconds % 2 === 0 ? "visible" : "hidden";
        document.getElementById("colon1").style.visibility = colonVisible;
        document.getElementById("colon2").style.visibility = colonVisible;

    }, 1000);
}

// ── Millisecond counter (runs separately for smooth display) ──
function msCounter() {
    setInterval(function () {
        var ms = new Date().getMilliseconds();
        var el = document.getElementById("ms");
        if (el) el.textContent = padMs(ms);
    }, 50);
}

// ── Init ──
$(document).ready(function () {
    clockRotation();   // main 1-second tick (your original function)
    msCounter();       // ms display
});
