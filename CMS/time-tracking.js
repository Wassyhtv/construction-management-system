document.addEventListener("DOMContentLoaded", () => {
  const employeeInput = document.getElementById("employee-name");
  const currentTimeEl = document.getElementById("current-time");
  const currentDateEl = document.getElementById("current-date");
  const elapsedTimeEl = document.getElementById("elapsed-time");
  const totalTimeEl = document.getElementById("total-time");
  const recordsTable = document.getElementById("records-table");
  const clockInBtn = document.getElementById("clock-in");
  const clockOutBtn = document.getElementById("clock-out");
  const resetBtn = document.getElementById("reset-records"); // NEW Reset Button

  let startTime = null;
  let elapsedTime = 0;
  let timer = null;
  let records = JSON.parse(localStorage.getItem("employeeRecords")) || [];

  // Load saved total time
  let totalSeconds = parseInt(localStorage.getItem("totalSeconds")) || 0;
  totalTimeEl.textContent = formatTime(totalSeconds);

  updateRecordsTable();

  // Update current time every second
  setInterval(() => {
    const now = new Date();
    currentTimeEl.textContent = now.toLocaleTimeString();
    currentDateEl.textContent = now.toLocaleDateString();
  }, 1000);

  // Clock In
  clockInBtn.addEventListener("click", () => {
    const employeeName = employeeInput.value.trim();
    if (!employeeName) {
      alert("Please enter an employee name.");
      return;
    }

    startTime = new Date();
    elapsedTime = 0;
    elapsedTimeEl.textContent = "00h : 00m : 00s";
    clockInBtn.disabled = true;
    clockOutBtn.disabled = false;

    // Start tracking elapsed time
    timer = setInterval(() => {
      elapsedTime++;
      elapsedTimeEl.textContent = formatTime(elapsedTime);
    }, 1000);
  });

  // Clock Out
  clockOutBtn.addEventListener("click", () => {
    if (startTime) {
      clearInterval(timer);
      const endTime = new Date();
      const sessionDuration = Math.floor((endTime - startTime) / 1000); // Convert ms to seconds

      records.push({
        name: employeeInput.value.trim(),
        clockIn: startTime.toLocaleTimeString(),
        clockOut: endTime.toLocaleTimeString(),
        duration: formatTime(sessionDuration),
      });

      localStorage.setItem("employeeRecords", JSON.stringify(records));
      updateRecordsTable();

      // Update total tracked time
      totalSeconds += sessionDuration;
      localStorage.setItem("totalSeconds", totalSeconds);
      totalTimeEl.textContent = formatTime(totalSeconds);

      startTime = null;
      clockInBtn.disabled = false;
      clockOutBtn.disabled = true;
    }
  });

  // Reset Records Button (NEW)
  resetBtn.addEventListener("click", () => {
    if (
      confirm(
        "Are you sure you want to reset all records? This action cannot be undone."
      )
    ) {
      localStorage.removeItem("employeeRecords");
      localStorage.removeItem("totalSeconds");
      records = [];
      totalSeconds = 0;
      elapsedTimeEl.textContent = "00h : 00m : 00s";
      totalTimeEl.textContent = "00h : 00m : 00s";
      updateRecordsTable();
      alert("Records have been reset.");
    }
  });

  function updateRecordsTable() {
    recordsTable.innerHTML =
      records.length > 0
        ? records
            .map(
              (record) => `
              <tr>
                  <td>${record.name}</td>
                  <td>${record.clockIn}</td>
                  <td>${record.clockOut}</td>
                  <td>${record.duration}</td>
              </tr>
          `
            )
            .join("")
        : `<tr><td colspan="4" style="text-align: center;">No records found</td></tr>`;
  }

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, "0")}h : ${String(minutes).padStart(
      2,
      "0"
    )}m : ${String(secs).padStart(2, "0")}s`;
  }
});
