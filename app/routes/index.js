

/**
 * This is Contain for all api.
 * @author Vishal Chouhan
 * @since April 3 2023
 */

/*
 * @file: index.js
 * @description: It's combine all routers.
 * @author: Vishal Chouhan
 */

import routes from "./route";
/*********** Combine all Routes ********************/
module.exports = routes

// import { login, register, logout } from "../services/authentications";
// import authorizationController from "../services/authorizationController";
// import licenseAppMappingController from "../services/licenseAppMappingController";
// import licenseKeyController from "../services/licenseKeyController";
// import licenseMasterController from "../services/licenseMasterController";
// import moduleMasterController from "../services/moduleMasterController";
// import organizationLicenseController from "../services/organizationLicenseController";
// import organizationMasterController from "../services/organizationMasterController";
// import paymentMasterController from "../services/paymentMasterController";
// import productActivationController from "../services/productActivationController";
// import rolesMasterController from "../services/rolesMasterController";
// import userActivityController from "../services/userActivityController";
// import userInvitationsController from "../services/userInvitationsController";
// import userMasterController from "../services/userMasterController";
// import userSessionController from "../services/userSessionController";
// import appMasterController from "../services/appMaster.js";
// import appModuleMasterController from "../services/appModule/index.js";
// import externalDirectoryController from "../services/externalDirectory/index.js";


// /**
//  * Express router instance.
//  * @type {Router}
//  */
// import { Router } from "express";
// const router = Router();



// // app module master
// router.get("/app_module_master", appModuleMasterController.getAppModules);
// router.post("/app_module_master", appModuleMasterController.createAppModule);
// router.put("/app_module_master/:id", appModuleMasterController.updateAppModule);
// router.delete(
//   "/app_module_master/:id",
//   appModuleMasterController.deleteAppModule
// );

// // authentication
// router.post("/login", login);
// router.post("/register", register);
// router.post("/logout", logout);

// // authorization
// router.get("/authorization", authorizationController.getAuthorization);
// router.post("/authorization", authorizationController.createAuthorization);
// router.put("/authorization/:id", authorizationController.updateAuthorization);
// router.delete(
//   "/authorization/:id",
//   authorizationController.deleteAuthorization
// );

// // external directory
// router.get(
//   "/external_directory",
//   externalDirectoryController.getExternalDirectoryById
// );
// router.post(
//   "/external_directory",
//   externalDirectoryController.createExternalDirectory
// );
// router.put(
//   "/external_directory/:id",
//   externalDirectoryController.updateExternalDirectoryById
// );
// router.delete(
//   "/external_directory/:id",
//   externalDirectoryController.deleteExternalDirectoryById
// );

// // license app mapping
// router.get(
//   "/license_app_mapping",
//   licenseAppMappingController.getLicenseAppMapping
// );
// router.post(
//   "/license_app_mapping",
//   licenseAppMappingController.createLicenseAppMapping
// );
// router.put(
//   "/license_app_mapping/:id",
//   licenseAppMappingController.updateLicenseAppMapping
// );
// router.delete(
//   "/license_app_mapping/:id",
//   licenseAppMappingController.deleteLicenseAppMapping
// );

// // license key
// router.get("/license_key", licenseKeyController.getLicenseKey);
// router.post("/license_key", licenseKeyController.createLicenseKey);
// router.put("/license_key/:id", licenseKeyController.updateLicenseKey);
// router.delete("/license_key/:id", licenseKeyController.deleteLicenseKey);

// // license master
// router.get("/license_master", licenseMasterController.getLicenseMaster);
// router.post("/license_master", licenseMasterController.createLicenseMaster);
// router.put("/license_master/:id", licenseMasterController.updateLicenseMaster);
// router.delete(
//   "/license_master/:id",
//   licenseMasterController.deleteLicenseMaster
// );

// // module master
// router.get("/module_master", moduleMasterController.getModuleMaster);
// router.post("/module_master", moduleMasterController.createModuleMaster);
// router.put("/module_master/:id", moduleMasterController.updateModuleMaster);
// router.delete("/module_master/:id", moduleMasterController.deleteModuleMaster);

// // organization license
// router.get(
//   "/organization_license",
//   organizationLicenseController.getOrganizationLicense
// );
// router.post(
//   "/organization_license",
//   organizationLicenseController.createOrganizationLicense
// );
// router.put(
//   "/organization_license/:id",
//   organizationLicenseController.updateOrganizationLicense
// );
// router.delete(
//   "/organization_license/:id",
//   organizationLicenseController.deleteOrganizationLicense
// );

// // organization master
// router.get(
//   "/organization_master",
//   organizationMasterController.getOrganizationMaster
// );
// router.post(
//   "/organization_master",
//   organizationMasterController.createOrganizationMaster
// );
// router.put(
//   "/organization_master/:id",
//   organizationMasterController.updateOrganizationMaster
// );
// router.delete(
//   "/organization_master/:id",
//   organizationMasterController.deleteOrganizationMaster
// );

// // payment master
// router.get("/payment_master", paymentMasterController.getPaymentMaster);
// router.post("/payment_master", paymentMasterController.createPaymentMaster);
// router.put("/payment_master/:id", paymentMasterController.updatePaymentMaster);
// router.delete(
//   "/payment_master/:id",
//   paymentMasterController.deletePaymentMaster
// );

// // product activation
// router.get(
//   "/product_activation",
//   productActivationController.getProductActivation
// );
// router.post(
//   "/product_activation",
//   productActivationController.createProductActivation
// );
// router.put(
//   "/product_activation/:id",
//   productActivationController.updateProductActivation
// );
// router.delete(
//   "/product_activation/:id",
//   productActivationController.deleteProductActivation
// );

// // roles master
// router.get("/roles_master", rolesMasterController.getRolesMaster);
// router.post("/roles_master", rolesMasterController.createRolesMaster);
// router.put("/roles_master/:id", rolesMasterController.updateRolesMaster);
// router.delete("/roles_master/:id", rolesMasterController.deleteRolesMaster);

// // user activity
// router.get("/user_activity", userActivityController.getUserActivity);
// router.post("/user_activity", userActivityController.createUserActivity);
// router.put("/user_activity/:id", userActivityController.updateUserActivity);
// router.delete("/user_activity/:id", userActivityController.deleteUserActivity);

// // user invitations
// router.get("/user_invitations", userInvitationsController.getUserInvitations);
// router.post(
//   "/user_invitations",
//   userInvitationsController.createUserInvitation
// );
// router.put(
//   "/user_invitations/:id",
//   userInvitationsController.updateUserInvitation
// );
// router.delete(
//   "/user_invitations/:id",
//   userInvitationsController.deleteUserInvitation
// );

// // user master
// router.get("/user_master", userMasterController.getUserMaster);
// router.post("/user_master", userMasterController.createUserMaster);
// router.put("/user_master/:id", userMasterController.updateUserMaster);
// router.delete("/user_master/:id", userMasterController.deleteUserMaster);

// // user session
// router.get("/user_session", userSessionController.getUserSession);
// router.post("/user_session", userSessionController.createUserSession);
// router.put("/user_session/:id", userSessionController.updateUserSession);
// router.delete("/user_session/:id", userSessionController.deleteUserSession);

// export default router;
