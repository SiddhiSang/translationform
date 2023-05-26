sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageBox) {
        "use strict";

        return Controller.extend("com.presalescentral.translationform.controller.Translation", {
            onInit: function () {

            },
            onPeopleSearchValHelp: function (oEvent, sType, oSrc) {

                // if (sType === 'presalesAnalystSearch') {
                //     this._oEmpSearchType = sType;
                //     this._oEmpInputSrc = oSrc;
                // } else {
                //     this._oEmpInputSrc = oEvent.getSource();
                //     this._oEmpSearchType = null;
                // }
                // // when the valueHelp button is pressed, a valueHelpDialog is opened 
                // // allowing the user to select a purchase order
                if (!this.oResourceDialog) {
                    this.oResourceDialog = sap.ui.xmlfragment("com.presalescentral.translationform.view.peopleSearchDialog", this);
                    this.getView().addDependent(this.oResourceDialog, this);
                }
                this.oResourceDialog.open();
            },
            onResourceDialogClose: function () {
                // var that = this;
                // sap.ui.getCore().byId("resourceSearchId").setValue("");
                // var oItems = sap.ui.getCore().byId("resourcesList").getBinding("items");
                // oItems.sCustomParams = "search=" + " ";
                // oItems.refresh();
                // this.oResourceDialog.getModel().attachRequestCompleted(function () {
                //     that._oApplicationProperties.setProperty("/isAppBusy", false);
                // });
                this.oResourceDialog.close();
            },
            onCrmOppChkBxSelect: function (oEvent) {
                var selected = oEvent.getParameter("selected");
                this.byId("oppLabel").setVisible(selected);
                this.byId("pcOpportunityInputComponent").setVisible(selected);
                // this.oppInput.setValue("");
                this.byId("actSetSel").setSelectedKey("");
                // this.oppInput.setEnabled(selected).setEditable(selected);
                this.byId("actSetLbl").setVisible(!selected);
                this.byId("actSetCont").setVisible(!selected);
                this.byId("actSetSel").setVisible(!selected);
                // this.oView.getModel("default").setProperty("/ActivitySetId", "");
                // var mAssetId = this.oView.getModel("default").getProperty("/AssetId"); //GIT#26
                // //this.byId("archivedActSetWarning").setVisible(selected);
                if (selected) {
                    // this.oppInput.setValue("");
                    this.isOppCBSelected = true;
                    this.byId("custNameInput").setValue("");
                    this.byId("custNameInput").setEnabled(false);
                    this.byId("actSetLbl").setVisible(False);
                } else {
                    this.isOppCBSelected = false;
                    this.byId("custNameInput").setValue("");
                    this.byId("custNameInput").setValueState("None");
                    this.byId("custNameInput").setEnabled(true);
                    this.byId("actSetLbl").setVisible(True);
                    if (this.byId("custSpecRbGrp").getSelectedIndex() === 0) {
                        this.byId("custNameInput").setEnabled(true);
                    }
                    if (mAssetId === "0019") { //GIT#26
                        // this.byId("actSetLbl").setRequired(false);
                        // this.byId("ActSetIcon").setVisible(false);
                    }
                    // this.oView.getModel("activitysetModel").setProperty("/isChecked", false);
                }
            },
            onToolsDocChange: function () {
                var that = this;
                var bAttachmentsDisplay = (this.byId("toolsDocType").getSelectedKey() === "0001") ? true : false;
                if (bAttachmentsDisplay) {
                    this.byId("toolsAttachType").setSelectedKey("");
                    this.byId("idLinkNameLbl").setVisible(true);
                    this.byId("linkName").setVisible(true);
                    this.byId("idLinkLbl").setVisible(true);
                    this.byId("linkUrl").setVisible(true);
                    this.byId("addLinkBtnId").setVisible(true);
    
                    // this._aMandatoryFields = this._aMandatoryFields.concat(this._getMandatoryLinkFileds());
    
                } else {
                    this.byId("toolsAttachType").setSelectedKey("");
                    this.byId("idLinkNameLbl").setVisible(false);
                    this.byId("linkName").setVisible(false);
                    this.byId("idLinkLbl").setVisible(false);
                    this.byId("linkUrl").setVisible(false);
                    this.byId("addLinkBtnId").setVisible(false);
                    // this._aMandatoryFields = this._aMandatoryFields.filter(function (el) {
                    //     var sViewId = that.getView().getId();
                    //     return el.getId() !== sViewId + "--linkName" && el.getId() !== sViewId + "--linkUrl";
    
                    // });
                }
    
                if (this.byId("toolsDocType").getSelectedKey() !== "0000") {
                    this.byId("toolsAttachType").setEnabled(true);
                    this.byId("attachTypeLbl").setRequired(true);
                } else {
                    this.byId("toolsAttachType").setEnabled(false);
                    this.byId("toolsAttachType").setSelectedKey(false);
                    this.byId("toolsAttachType").setValueState("None");
                    this.byId("attachTypeLbl").setRequired(false);
                    // this._aMandatoryFields = this._aMandatoryFields.filter(function (el) {
                    //     var sViewId = that.getView().getId();
                    //     return el.getId() !== sViewId + "--toolsAttachType";
    
                    // });
                }
    
                if (this.byId("assetBox").getSelectedKey() === "0019" && this.byId("toolsDocType").getSelectedKey() !== "0000") {
                    this.byId("linkUrlDesc").setVisible(true);
                } else {
                    this.byId("linkUrlDesc").setVisible(false);
                }
            },
            onCancelTranslation: function () {

               
                MessageBox.show('Do you want to cancel request?', {
                    icon: MessageBox.Icon.WARNING,
                    title: 'Cancel',
                    actions: ["Ok", MessageBox.Action.CANCEL],
                    onClose: function (oAction) {
                        if (oAction === "Ok") {
                            fnDelete();
                        }
                    }
                });
            },

            onCustomerSpecificChange: function (oEvent) {
                var selectedIndex = oEvent.getSource().getProperty("selectedIndex");
                var bCustomerSpecific = (selectedIndex === 0) ? true : false;
                oEvent.getSource().setValueState("None");
                this.byId("custNameInput").setValueState("None");
                // this._oView.getModel("default").setProperty("/CustomerSpecific", bCustomerSpecific);
                // var oAssetId = this.oView.getModel("default").getProperty("/AssetId"); //GIT#26
                this._openCustomerSpecificDialog();
                if (selectedIndex === 1) { //GIT#26
                    // if (oAssetId !== "0019") {
                    //     this._openCustomerSpecificDialog();
                    // } else {
                    //     this.onCustomerSpecificAccept();
                    // }
                    this._openCustomerSpecificDialog();
                    this.byId("custNameLabel").setRequired(false);
                    this.byId("custNameInput").setValue("");
                    this.byId("custNameInput").setEnabled(false);
                    // this.oppInput.setValue("");
                } else {
                    this.byId("oppLabel").setVisible(true);
                    this.byId("pcOpportunityInputComponent").setVisible(true);
                    // if (this.oppInput.getEnabled() === false || sap.ui.getCore().byFieldGroupId(
                    //         "pcOpportunityInput")[0].getEditable() === false) {
                    //     this.oppInput.setEditable(true);
                    //     this.oppInput.setEnabled(true);
                    // }
                    // this.oppInput.setValue("");
                    this.byId("crmOpportunityChkBx").setEnabled(true);
                    this.byId("crmOpportunityChkBx").setSelected(true);
                    this.byId("actSetCont").setVisible(false);
                    this.byId("actSetSel").setVisible(false);
                    this.byId("actSetLbl").setVisible(false);
                    // if (oAssetId === "0019" && selectedIndex === 1) { //GIT#26
                    //     this.byId("custNameLabel").setRequired(false); //GIT#26
                    //     this.byId("custNameInput").setEnabled(false); //GIT#26
                    //     this.byId("crmOpportunityChkBx").setSelected(false).setEnabled(false); //GIT#26
                    // }
                    if (selectedIndex !== 1) { //GIT#26
                        this.byId("custNameLabel").setRequired(true); //GIT#26   
                    }
                }
            },
            _openCustomerSpecificDialog: function () {
                // this._oApplicationProperties.setProperty("/isAppBusy", true);
                if (!this.oCustomerSpecificDialog) {
                    this.oCustomerSpecificDialog = sap.ui.xmlfragment("com.presalescentral.translationform.view.customerSpecificDialog", this);
                    this.getView().addDependent(this.oCustomerSpecificDialog);
                }
                // the filter is set to show only purchase orders matching to the already entered text
                this.oCustomerSpecificDialog.open();
                // jQuery.sap.delayedCall(500, this, function () {
                //     /*	var sLink = "https://portal.wdf.sap.corp/wcm/ROLES:/portal_content/com.sap.sen.employee/com.sap.sen.rl_employee-services/employee-services/support/" +
                //             "pg_business_serv_cat/Infocenters/Human Resources for SAP/Employee Services/Subpages/Business Services Catalog/Content Services/Translation";
                //         $("a.custSpecificExtLink").attr("href", sLink);*/
                //     $(".custSpecificExtLink")[0].href =
                //         "https://portal.wdf.sap.corp/wcm/ROLES:/portal_content/com.sap.sen.employee/com.sap.sen.rl_employee-services/employee-services/support/" +
                //         "pg_business_serv_cat/Infocenters/Human Resources for SAP/Employee Services/Subpages/Business Services Catalog/Content Services/Translation";
                //     this._oApplicationProperties.setProperty("/isAppBusy", false);
                // });
            },
            onCustomerSpecificAccept: function () {
                // check this , if dialog should not be closed on escape :- https://sapui5.hana.ondemand.com/explored.html#/sample/sap.m.sample.Dialog/code/C.controller.js
                // this._oView.getModel("default").setProperty("/CustomerSpecific", false);
                this.byId("custNameLabel").setRequired(false);
                if (this.oCustomerSpecificDialog) {
                    this.oCustomerSpecificDialog.close();
                }
                // if no customer specific 
                this.byId("oppLabel").setVisible(false);
                this.byId("pcOpportunityInputComponent").setVisible(false);
                this.byId("crmOpportunityChkBx").setSelected(false).setEnabled(false);
                this.byId("actSetCont").setVisible(true);
                this.byId("actSetSel").setVisible(true);
                this.byId("actSetLbl").setVisible(true);
            },
            onCustomerSpecificReject: function () {
                // check this , if dialog should not be closed on escape :- https://sapui5.hana.ondemand.com/explored.html#/sample/sap.m.sample.Dialog/code/C.controller.js
                // this._oView.getModel("default").setProperty("/CustomerSpecific", true);
                this.byId("custNameLabel").setRequired(true); //GIT#26
                this.byId("custSpecRbGrp").setSelectedIndex(0);
                this.oCustomerSpecificDialog.close();
    
            },
        });
    });
