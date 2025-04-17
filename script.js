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
            <input type="text" class="time" placeholder="HH:MM:SS" value="00:00:00">
            <button class="remove-btn">Remove</button>
        `;
        inputsContainer.appendChild(newInput);

        // Add event listener to the remove button
        newInput.querySelector('.remove-btn').addEventListener('click', function() {
            inputsContainer.removeChild(newInput);
        });
    });

    // Calculate the total time
    calculateBtn.addEventListener('click', function() {
        const timeInputs = document.querySelectorAll('.time');
        let totalSeconds = 0;

        timeInputs.forEach(input => {
            const timeStr = input.value.trim();
            if (timeStr) {
                const parts = timeStr.split(':').map(part => parseInt(part) || 0);
                const [hours, minutes, seconds] = parts.length === 3 ? parts : 
                                              parts.length === 2 ? [0, ...parts] : 
                                              [0, 0, parts[0]];
                totalSeconds += hours * 3600 + minutes * 60 + seconds;
            }
        });

        // Convert total seconds back to HH:MM:SS
        const hours = Math.floor(totalSeconds / 3600);
        const remainingSeconds = totalSeconds % 3600;
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;

        const format = (num) => num.toString().padStart(2, '0');
        const totalTime = `${format(hours)}:${format(minutes)}:${format(seconds)}`;
        
        resultDiv.textContent = `Total: ${totalTime}`;
    });

    // Allow removing the first input (if there are multiple)
    document.querySelector('.remove-btn')?.addEventListener('click', function() {
        if (document.querySelectorAll('.time-input').length > 1) {
            inputsContainer.removeChild(this.parentElement);
        }
    });
});
