const Interceptor = require('../src/core/Interceptor');
const path = require('path');
const fs = require('fs');

async function runTest() {
  console.log('🚀 Starting BudgetSentry Manual Test...\n');

  // Use a test database
  const testDb = path.join(__dirname, 'test.db');
  if (fs.existsSync(testDb)) fs.unlinkSync(testDb);

  const interceptor = new Interceptor(testDb);

  try {
    console.log('1. Initializing...');
    await interceptor.init();

    console.log('2. Setting budget to $0.10 for testing...');
    await interceptor.storage.setDailyLimit(0.10);

    console.log('3. Checking if we can spend $0.01...');
    const can1 = await interceptor.canSpend(0.01);
    console.log(`Result: ${can1 ? '✅ Allowed' : '❌ Denied'}`);

    console.log('\n4. Logging usage: gpt-4o with 5k in, 2k out...');
    // Cost: (5 * 0.005) + (2 * 0.015) = 0.025 + 0.03 = 0.055
    const cost1 = await interceptor.logSpend('gpt-4o', 5000, 2000);
    console.log(`Logged cost: $${cost1.toFixed(4)}`);

    const status = await interceptor.getStatus();
    console.log(`Current spend: $${status.spent.toFixed(4)} / $${status.limit.toFixed(2)}`);

    console.log('\n5. Checking if we can spend another $0.06 (predicted total 0.055 + 0.06 = 0.115 > 0.10)...');
    const can2 = await interceptor.canSpend(0.06);
    console.log(`Result: ${can2 ? '✅ Allowed (Unexpected!)' : '❌ Denied (Correct)'}`);

    console.log('\n6. Logging more usage to trigger hard limit: gpt-4o 5k in, 2k out...');
    const cost2 = await interceptor.logSpend('gpt-4o', 5000, 2000);
    console.log(`Logged cost: $${cost2.toFixed(4)}`);

    const finalStatus = await interceptor.getStatus();
    console.log(`Final spend: $${finalStatus.spent.toFixed(4)} / $${finalStatus.limit.toFixed(2)}`);
    console.log(`Usage: ${finalStatus.percent.toFixed(1)}%`);

    console.log('\n7. Final check (should be denied regardless of predicted cost)...');
    const can3 = await interceptor.canSpend(0.001);
    console.log(`Result: ${can3 ? '✅ Allowed' : '❌ Denied (Correct)'}`);

    console.log('\n✨ Test Suite Completed.');
  } catch (err) {
    console.error('❌ Test Failed:', err);
  } finally {
    interceptor.storage.close();
    if (fs.existsSync(testDb)) fs.unlinkSync(testDb);
  }
}

runTest();
