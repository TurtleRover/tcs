/*
 * Test messages send between different modules of the software
*/
QUnit.test("ui->controller topic test", function(assert) {
	assert.expect(2);
	var done = assert.async();
	
	var myButton = $("#myButton");
	myButton.hide();
	
	myButton.on("click", function() {
		assert.ok(true, "button was clicked!");
	});
	
	setTimeout(function() {
		assert.equal(utests.getLastMessage(), "myButton");
		done();
	}, 100);
	
	myButton.trigger("click");
});