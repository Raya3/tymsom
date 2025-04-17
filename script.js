document.addEventListener('DOMContentLoaded', function() {
    const inputsContainer = document.getElementById('inputs');
    const addBtn = document.getElementById('add-btn');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');

    // Add a new time input field
    addBtn.addEventListener('click', function() {
        const newInput = document.createElement('div');
        newInput.className = 'time-input';
        newInput.innerHTML = `
            <input type="text" class="time" placeholder="HH:MM" value="00:00">
            <button class="remove-btn">Remove</button>
        `;
        inputsContainer.appendChild(newInput);

        // Add event listener to the remove button
        newInput.querySelector('.remove-btn').addEventListener('click', function() {
            if (document.querySelectorAll('.time-input').length > 1) {
                inputsContainer.removeChild(newInput);
            }
        });
    });

    // Calculate the total time
    calculateBtn.addEventListener('click', function() {
        const timeInputs = document.querySelectorAll('.time');
        let totalMinutes = 0;

        timeInputs.forEach(input => {
            const timeStr = input.value.trim();
            if (timeStr) {
                const parts = timeStr.split(':').map(part => parseInt(part) || 0);
                const [hours, minutes] = parts.length === 2 ? parts : [0, parts[0]];
                totalMinutes += hours * 60 + minutes;
            }
        });

        // Convert total minutes back to HH:MM
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        const format = (num) => num.toString().padStart(2, '0');
        const totalTime = `${format(hours)}:${format(minutes)}`;
        
        resultDiv.textContent = `Total: ${totalTime}`;
    });

    // Allow removing default inputs (if there are multiple)
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (document.querySelectorAll('.time-input').length > 1) {
                inputsContainer.removeChild(this.parentElement);
            }
        });
    });
});
