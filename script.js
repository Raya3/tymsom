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
            <button class="adjust-btn minus">-15m</button>
            <input type="text" class="time" placeholder="HH:MM" value="00:00">
            <button class="adjust-btn plus">+15m</button>
            <button class="remove-btn">✕</button>
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

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('adjust-btn')) {
        const input = e.target.closest('.time-input').querySelector('.time');
        let [hours, minutes] = input.value.split(':').map(Number);
        let totalMinutes = hours * 60 + minutes;
    
        // Adjust time
        totalMinutes += e.target.classList.contains('plus') ? 15 : -15;
        
        // Handle negative time (optional: set to 0 instead)
        if (totalMinutes < 0) totalMinutes = 0;
    
        // Convert back to HH:MM
        hours = Math.floor(totalMinutes / 60);
        minutes = totalMinutes % 60;
        input.value = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        }
    });
});
