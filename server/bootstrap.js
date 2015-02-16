Meteor.startup(function () {

    if (Contacts.find({}).count() === 0) {
        _(7).times(function(n) {
            var user = Fake.user();

            Contacts.insert({
                name: {
                    first: user.name,
                    last: user.surname
                },
                emails: [{label: 'Work', address: user.email}],
                priority: Fake.fromArray(['High', 'Medium', 'Low']),
                location: {
                    city: Fake.word(),
                    state: Fake.fromArray(STATES)
                },
                details: {
                    notes: Fake.paragraph(),
                    active: Fake.fromArray([true, false])
                },
                owner: 'public'

        },function (err) {

            })
        });
    }


    Accounts.config({loginExpirationInDays: 10});
    var i = Meteor.users.findOne({username: "admin"});
    if (!i) {
        Accounts.createUser({username: "admin",password: "ChangeMe"});
        Accounts.createUser({username: "demo",password: "demo"});

    }



});


    Meteor.methods({
        initDB: function () {

            Contacts.remove({});


            Meteor.users.remove({});
            Accounts.createUser({username: "admin", password: "ChangeMe"});
            Accounts.createUser({username: "demo", password: "demo"});

            _(7).times(function(n) {
                var user = Fake.user();

                Contacts.insert({
                    name: {
                        first: user.name,
                        last: user.surname
                    },
                    emails: [{label: 'Work', address: user.email}],
                    priority: Fake.fromArray(['High', 'Medium', 'Low']),
                    location: {
                        city: Fake.word(),
                        state: Fake.fromArray(STATES)
                    },
                    details: {
                        notes: Fake.paragraph(),
                        active: Fake.fromArray([true, false])
                    },
                    owner: 'public'
                },function (err) {

                });
            });

        },
        sendEmail: function (to,from, subject, text) {

            check([to, from, subject, text], [String]);
            // Let other method calls from the same client start running,
            // without waiting for the email sending to complete.
            this.unblock();

            // don’t allow sending email unless the user is logged in
            if (!Meteor.user())
                throw new Meteor.Error(403,"not logged in")

            // and here is where you can throttle the number of emails this user
            // is allowed to send per day

            Email.send({
                to: to,
                from: from,
                subject: subject,
                text: text
            });
        }
    });

