import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Text "mo:core/Text";

actor {
  type ContactRequest = {
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
  };

  module ContactRequest {
    public func compare(request1 : ContactRequest, request2 : ContactRequest) : Order.Order {
      switch (Text.compare(request1.name, request2.name)) {
        case (#equal) { Text.compare(request1.email, request2.email) };
        case (order) { order };
      };
    };

    public func compareByEmail(request1 : ContactRequest, request2 : ContactRequest) : Order.Order {
      Text.compare(request1.email, request2.email);
    };
  };

  let contactRequests = Map.empty<Text, ContactRequest>();

  public shared ({ caller }) func submitContactRequest(id : Text, name : Text, phone : Text, email : Text, message : Text) : async () {
    let contactRequest : ContactRequest = {
      name;
      phone;
      email;
      message;
    };

    if (contactRequests.containsKey(id)) {
      Runtime.trap("Contact request with this id already exists!");
    };

    contactRequests.add(id, contactRequest);
  };

  public query ({ caller }) func getContactRequest(id : Text) : async ContactRequest {
    switch (contactRequests.get(id)) {
      case (null) { Runtime.trap("Contact request with this id does not exist!") };
      case (?contactRequest) { contactRequest };
    };
  };

  public query ({ caller }) func getAllContactRequests() : async [ContactRequest] {
    contactRequests.values().toArray().sort();
  };

  public query ({ caller }) func getAllContactRequestsByEmail() : async [ContactRequest] {
    contactRequests.values().toArray().sort(ContactRequest.compareByEmail);
  };
};
