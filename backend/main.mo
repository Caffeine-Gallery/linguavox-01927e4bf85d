import Array "mo:base/Array";
import Func "mo:base/Func";
import Hash "mo:base/Hash";

import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";

actor TranslationStore {
  // Stable variable to store translations across upgrades
  stable var translationsEntries : [(Text, Text)] = [];

  // HashMap to store the last translation for each language
  var translations = HashMap.HashMap<Text, Text>(0, Text.equal, Text.hash);

  // Initialize the HashMap with stable data after upgrade
  public func postupgrade() {
    translations := HashMap.fromIter<Text, Text>(translationsEntries.vals(), 0, Text.equal, Text.hash);
  };

  // Store translations before upgrade
  public func preupgrade() {
    translationsEntries := Iter.toArray(translations.entries());
  };

  // Function to store a translation
  public func storeTranslation(language: Text, translation: Text) : async () {
    translations.put(language, translation);
  };

  // Function to retrieve a translation
  public query func getTranslation(language: Text) : async ?Text {
    translations.get(language)
  };
}
