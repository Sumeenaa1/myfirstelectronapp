window.addEventListener('DOMContentLoaded', async () => {

    const note = document.getElementById('note');
    const status = document.getElementById('status');

    let lastSaved = '';

    // Load on start
    
    // Save
    document.getElementById('save').onclick = async () => {
        await window.api.save(note.value);
        lastSaved = note.value;
        status.innerText = "Saved!";
    };

    // Save As
    document.getElementById('saveAs').onclick = async () => {
        const ok = await window.api.saveAs(note.value);
        status.innerText = ok ? "Saved as new file!" : "Cancelled";
    };

    
    // Delete
document.getElementById('delete').onclick = async () => {

    const confirmDelete = confirm("Delete all notes?");

    if (!confirmDelete) return;

    await window.api.deleteAll();

    location.reload();
};

    // New Note
    document.getElementById('new').onclick = async () => {

    location.reload();
};

    // Load Note
    document.getElementById('load').onclick = async () => {
        const data = await window.api.load();
        note.value = data;
        lastSaved = data;
        status.innerText = "Note loaded!";
    };

    // Auto Save
    let timer;
    note.addEventListener('input', () => {
        clearTimeout(timer);

        timer = setTimeout(async () => {
            if (note.value.trim() !== '' && note.value !== lastSaved) {
                await window.api.save(note.value);
                lastSaved = note.value;

                const time = new Date().toLocaleTimeString();
                status.innerText = "Auto saved at " + time;
            }
        }, 3000);
    });

      // NEW: Menu action listeners
window.api.onMenuAction('menu-new-note', () => {
  document.getElementById('new').click();   // reuse the existing button logic
});

window.api.onMenuAction('menu-open-file', () => {
  document.getElementById('load').click(); // reuse the existing button logic
});

window.api.onMenuAction('menu-save', () => {
  document.getElementById('save').click();      // reuse the existing button logic
});

window.api.onMenuAction('menu-save-as', () => {
  document.getElementById('saveAs').click();       // reuse the existing button logic
});

});