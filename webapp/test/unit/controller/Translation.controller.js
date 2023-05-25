/*global QUnit*/

sap.ui.define([
	"compresalescentral/translationform/controller/Translation.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Translation Controller");

	QUnit.test("I should test the Translation controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
