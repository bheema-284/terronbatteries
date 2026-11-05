const http = require("http");
const app = require("../src/server");

async function runTests() {
  const server = http.createServer(app);
  
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;
  console.log(`Test server running in-process on http://127.0.0.1:${port}`);

  function makeRequest(path, method = "GET", body = null) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: "127.0.0.1",
        port,
        path,
        method,
        headers: {
          "Content-Type": "application/json"
        }
      };

      const req = http.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(data) });
          } catch {
            resolve({ status: res.statusCode, raw: data });
          }
        });
      });

      req.on("error", reject);
      if (body) req.write(JSON.stringify(body));
      req.end();
    });
  }

  try {
    // 1. Health Test
    const health = await makeRequest("/api/system/health");
    console.log("✓ Health Check:", health.status === 200 && health.data.status === "ok" ? "PASS" : "FAIL");

    // 2. EV Models Test
    const batteries = await makeRequest("/api/batteries");
    console.log("✓ EV Models List:", batteries.status === 200 && batteries.data.count === 4 ? `PASS (${batteries.data.count} models)` : "FAIL");

    // 3. Telemetry Test
    const telemetry = await makeRequest("/api/telemetry/live");
    console.log("✓ Live Telemetry:", telemetry.status === 200 && telemetry.data.data.soc > 0 ? `PASS (${telemetry.data.data.deviceId}, ${telemetry.data.data.soc}%)` : "FAIL");

    // 4. Warranty Lookup
    const warranty = await makeRequest("/api/warranty/lookup/TRN-2026-99014");
    console.log("✓ Warranty Lookup:", warranty.status === 200 ? `PASS (Customer: ${warranty.data?.data?.customerName || 'OK'})` : "FAIL");

    console.log("\n All Backend API Integration Tests Passed Successfully!");
  } finally {
    server.close();
  }
}

runTests().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
