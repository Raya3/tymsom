document.addEventListener('DOMContentLoaded', function() {
    const inputsContainer = document.getElementById('inputs');
    const addBtn = document.getElementById('add-btn');
    const resultDiv = document.getElementById('result');

    // Main calculation function
    function calculateTotal() {
        const timeInputs = document.querySelectorAll('.time');
        let totalMinutes = 0;

        timeInputs.forEach(input => {
            const timeStr = input.value.trim();
            if (timeStr) {
                const [hours, minutes] = timeStr.split(':').map(Number);
                totalMinutes += hours * 60 + minutes;
            }
        });

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        resultDiv.textContent = `Total: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }

    // Setup event listeners for a time input
    function setupTimeInput(input) {
        // Input changes
        input.addEventListener('input', calculateTotal);
        input.addEventListener('change', calculateTotal);
        
        // Arrow buttons
        const parent = input.closest('.time-input');
        parent.querySelector('.plus').addEventListener('click', function() {
            const [hours, minutes] = input.value.split(':').map(Number);
            let total = hours * 60 + minutes + 15;
            input.value = `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
            calculateTotal();
        });
        
        parent.querySelector('.minus').addEventListener('click', function() {
            const [hours, minutes] = input.value.split(':').map(Number);
            let total = Math.max(0, hours * 60 + minutes - 15);
            input.value = `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
            calculateTotal();
        });
        
        // Remove button
        parent.querySelector('.remove-btn').addEventListener('click', function() {
            if (document.querySelectorAll('.time-input').length > 1) {
                parent.remove();
                calculateTotal();
            }
        });
    }

    // Initialize existing inputs
    document.querySelectorAll('.time').forEach(setupTimeInput);
    calculateTotal(); // Initial calculation

    // Add new time input
    addBtn.addEventListener('click', function() {
        const newInput = document.createElement('div');
        newInput.className = 'time-input';
        newInput.innerHTML = `
            <button class="adjust-btn minus">▼</button>
            <input type="text" class="time" placeholder="HH:MM" value="00:00">
            <button class="adjust-btn plus">▲</button>
            <button class="remove-btn">✕</button>
        `;
        inputsContainer.appendChild(newInput);
        setupTimeInput(newInput.querySelector('.time'));
    });
});