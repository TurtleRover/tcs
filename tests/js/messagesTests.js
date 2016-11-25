/*
 * Test messages send between different modules of the software
*/
QUnit.test("ui->controller topic test", function(assert) {
	assert.expect(1);
	
	var myButton = $("#myButton");
	myButton.hide();
	
	myButton.on("click", function() {
		assert.ok(true, "button was clicked!");
	});
	
	myButton.trigger("click");
});