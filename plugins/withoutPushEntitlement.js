/**
 * expo-notifications automatically adds the `aps-environment` (Push
 * Notifications) entitlement to the iOS project during `expo prebuild`,
 * even though this app only schedules LOCAL notifications and never
 * registers for remote/APNs push. That entitlement forces every iOS
 * build to use a provisioning profile with the Push Notifications
 * capability enabled, which we don't want (and don't need).
 *
 * This plugin runs after the expo-notifications plugin (must be listed
 * after it in app.json's "plugins" array) and removes that entitlement
 * again, so any provisioning profile/certificate works for building.
 *
 * Local notifications (Notifications.scheduleNotificationAsync) do not
 * require this entitlement at all - it's only needed for remote push.
 */
const { withEntitlementsPlist } = require('expo/config-plugins');

const withoutPushEntitlement = (config) => {
  return withEntitlementsPlist(config, (config) => {
    delete config.modResults['aps-environment'];
    return config;
  });
};

module.exports = withoutPushEntitlement;
