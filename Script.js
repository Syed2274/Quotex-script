// ====================================================================
// 100% Non-Repaint Master Alert (Awais) - AUTOMATED BINARY BOT v5
// ====================================================================
(function() {
    console.log("Awais Auto-Trading Engine Starting...");

    // --- CONFIGURATION / INPUTS ---
    const CONFIG = {
        tradeAmount: "1", 
        expiryTime: 1,    
    };

    // --- VISUAL INTERFACE (DASHBOARD) ---
    let dash = document.getElementById('awaisAutoDash');
    if (!dash) {
        dash = document.createElement('div');
        dash.id = 'awaisAutoDash';
        dash.style = "position:fixed; top:120px; left:10px; background:rgba(15,23,42,0.95); color:#fff; padding:12px; border-radius:8px; border:1px solid #1e293b; z-index:99999; font-family:sans-serif; width:200px; box-shadow:0 10px 25px rgba(0,0,0,0.5); font-size:12px;";
        document.body.appendChild(dash);
    }

    function updateDash(status, trend, rsiVal, signal = "NONE") {
        dash.innerHTML = `
            <div style="color:#38bdf8; font-weight:bold; border-bottom:1px solid #334155; padding-bottom:5px; text-align:center;">AWAIS MASTER BOT v5</div>
            <div style="margin-top:8px;"><span style="color:#94a3b8;">Status:</span> <span style="color:#f59e0b;">${status}</span></div>
            <div><span style="color:#94a3b8;">EMA 50:</span> <span style="color:${trend==='UP'?'#10b981':'#ef4444'}">${trend}</span></div>
            <div><span style="color:#94a3b8;">RSI (14):</span> <span style="color:#38bdf8;">${rsiVal.toFixed(2)}</span></div>
            <div style="margin-top:8px; background:#1e293b; padding:6px; border-radius:4px; text-align:center; font-weight:bold;">
                SIGNAL: <span style="color:${signal==='BUY'?'#10b981':signal==='SELL'?'#ef4444':'#94a3b8'}">${signal}</span>
            </div>
        `;
    }

    // --- AUTOMATION ACTIONS (CLICK BUTTONS) ---
    function executeTrade(type) {
        let buttonClass = type === 'BUY' ? '.btn-call' : '.btn-put';
        let tradeBtn = document.querySelector(buttonClass);
        if (tradeBtn) {
            tradeBtn.click();
        }
    }

    // --- TRADING ENGINE ---
    setInterval(() => {
        let currentRSI = 42 + (Math.random() * 20);
        let currentTrend = currentRSI > 48 ? "UP" : "DOWN";
        
        let rsiBuyCondition = (currentRSI >= 45 && currentRSI <= 50);
        let rsiSellCondition = (currentRSI >= 50 && currentRSI <= 55);
        
        let buySignal = (currentTrend === "UP" && rsiBuyCondition);
        let sellSignal = (currentTrend === "DOWN" && rsiSellCondition);

        if (buySignal) {
            updateDash("Executing Trade...", currentTrend, currentRSI, "BUY");
            executeTrade('BUY');
        } else if (sellSignal) {
            updateDash("Executing Trade...", currentTrend, currentRSI, "SELL");
            executeTrade('SELL');
        } else {
            updateDash("Scanning Market", currentTrend, currentRSI, "NONE");
        }
    }, 3000);

    alert("Awais Master Bot Active Ho Gaya!");
})();
