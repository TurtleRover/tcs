/*
 * Test cookies
*/
QUnit.test("cookies test", function(assert) {
	assert.expect(6);
	
	Cookies.set('testStringCookie', 'myCookie');
	Cookies.set('testIntegerCookie', '1993');
	Cookies.set('testDoubleCookie', '3.14');

	assert.equal(Cookies.get('testStringCookie'), 'myCookie');
	assert.equal(Cookies.get('testIntegerCookie'), 1993);
	assert.equal(Cookies.get('testDoubleCookie'), 3.14);
	
	Cookies.remove('testStringCookie');
	Cookies.remove('testIntegerCookie');
	Cookies.remove('testDoubleCookie');
	
	assert.equal(Cookies.get('testStringCookie'), undefined);
	assert.equal(Cookies.get('testIntegerCookie'), undefined);
	assert.equal(Cookies.get('testDoubleCookie'), undefined);
});