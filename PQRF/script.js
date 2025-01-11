document.getElementById("processButton").addEventListener("click", () => {
    const inputData = document.getElementById("inputData").value;
    const lines = inputData.trim().split("\n");


    const slotData = {};


    lines.forEach(line => {
        const match = line.match(/Rack=(\d+),Shelf=(\d+),Slot=(\d+),Port=(\d+)/);
        if (match) {
            const slot = match[3];
            const port = match[4];


            if (!slotData[slot]) {
                slotData[slot] = [];
            }
            slotData[slot].push(port);
        }
    });


    const result = Object.keys(slotData)
        .sort((a, b) => a - b)
        .map(slot => `SLOT ${slot} PTO ${slotData[slot].sort((a, b) => a - b).join(",")}`)
        .join(" // ");


    const outputElement = document.getElementById("outputResult");
    outputElement.textContent = result;


    const copyButton = document.getElementById("copyButton");
    copyButton.disabled = false;
});

document.getElementById("copyButton").addEventListener("click", () => {
    const outputResult = document.getElementById("outputResult").textContent;
    navigator.clipboard.writeText(outputResult).then(() => {
        alert("Output copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy:", err);
    });
});

window.addEventListener("load", () => {
    document.getElementById("inputData").value = "";
    document.getElementById("outputResult").textContent = "";
    document.getElementById("copyButton").disabled = true;
});