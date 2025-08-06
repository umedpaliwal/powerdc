/**
 * Test script for API routes
 * Run with: node scripts/test-api-routes.js
 * 
 * Note: This script tests the API route structure and error handling
 * without requiring authentication. For full testing, use the browser
 * or a tool like Postman with proper authentication.
 */

const fs = require('fs');
const path = require('path');

const API_ROUTES = [
  'app/api/user/profile/route.ts',
  'app/api/subscriptions/route.ts',
  'app/api/usage/route.ts',
  'app/api/saved-searches/route.ts',
  'app/api/saved-searches/[id]/route.ts',
];

const UTILITY_FILES = [
  'lib/usage-tracking.ts',
  'lib/saved-searches.ts',
  'lib/database-utils.ts',
];

function checkFileExists(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  const exists = fs.existsSync(fullPath);
  console.log(`${exists ? '✅' : '❌'} ${filePath} ${exists ? 'exists' : 'missing'}`);
  return exists;
}

function checkRouteStructure(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ ${filePath} - File not found`);
    return false;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  
  // Check for proper imports
  const hasSupabaseImport = content.includes("from '@/lib/supabase/server'");
  const hasNextResponseImport = content.includes("from 'next/server'");
  
  // Check for HTTP methods
  const hasGET = content.includes('export async function GET');
  const hasPOST = content.includes('export async function POST');
  const hasPUT = content.includes('export async function PUT');
  const hasDELETE = content.includes('export async function DELETE');
  
  // Check for error handling
  const hasErrorHandling = content.includes('try {') && content.includes('} catch');
  const hasAuthCheck = content.includes('auth.getUser()');
  
  console.log(`📝 ${filePath}:`);
  console.log(`   ${hasSupabaseImport ? '✅' : '❌'} Supabase import`);
  console.log(`   ${hasNextResponseImport ? '✅' : '❌'} NextResponse import`);
  console.log(`   ${hasGET ? '✅' : '⏸️'} GET method`);
  console.log(`   ${hasPOST ? '✅' : '⏸️'} POST method`);
  console.log(`   ${hasPUT ? '✅' : '⏸️'} PUT method`);
  console.log(`   ${hasDELETE ? '✅' : '⏸️'} DELETE method`);
  console.log(`   ${hasErrorHandling ? '✅' : '❌'} Error handling`);
  console.log(`   ${hasAuthCheck ? '✅' : '❌'} Authentication check`);
  
  return hasSupabaseImport && hasNextResponseImport && hasErrorHandling && hasAuthCheck;
}

function checkUtilityFile(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ ${filePath} - File not found`);
    return false;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  
  // Check for proper exports
  const hasExports = content.includes('export');
  const hasErrorHandling = content.includes('try {') && content.includes('} catch');
  
  console.log(`📦 ${filePath}:`);
  console.log(`   ${hasExports ? '✅' : '❌'} Has exports`);
  console.log(`   ${hasErrorHandling ? '✅' : '❌'} Error handling`);
  
  return hasExports;
}

console.log('🔍 Testing API Routes Structure...\n');

console.log('📂 Checking API Route Files:');
let allRoutesExist = true;
for (const route of API_ROUTES) {
  if (!checkFileExists(route)) {
    allRoutesExist = false;
  }
}

console.log('\n📂 Checking Utility Files:');
let allUtilsExist = true;
for (const util of UTILITY_FILES) {
  if (!checkFileExists(util)) {
    allUtilsExist = false;
  }
}

console.log('\n🔍 Analyzing Route Structure:');
let allRoutesValid = true;
for (const route of API_ROUTES) {
  if (!checkRouteStructure(route)) {
    allRoutesValid = false;
  }
  console.log('');
}

console.log('🔍 Analyzing Utility Files:');
let allUtilsValid = true;
for (const util of UTILITY_FILES) {
  if (!checkUtilityFile(util)) {
    allUtilsValid = false;
  }
  console.log('');
}

console.log('📊 Summary:');
console.log(`${allRoutesExist ? '✅' : '❌'} All API route files exist`);
console.log(`${allUtilsExist ? '✅' : '❌'} All utility files exist`);
console.log(`${allRoutesValid ? '✅' : '❌'} All routes have proper structure`);
console.log(`${allUtilsValid ? '✅' : '❌'} All utilities are valid`);

const overallSuccess = allRoutesExist && allUtilsExist && allRoutesValid && allUtilsValid;
console.log(`\n${overallSuccess ? '🎉' : '⚠️'} Overall: ${overallSuccess ? 'PASS' : 'NEEDS ATTENTION'}`);

if (overallSuccess) {
  console.log('\n✨ All API routes and utilities are properly set up!');
  console.log('💡 Next steps:');
  console.log('   1. Ensure environment variables are set (.env.local)');
  console.log('   2. Verify Supabase tables exist with proper schemas');
  console.log('   3. Test with actual authentication in browser');
  console.log('   4. Check browser console for any runtime errors');
} else {
  console.log('\n❗ Some issues were found. Please review the output above.');
}

process.exit(overallSuccess ? 0 : 1);