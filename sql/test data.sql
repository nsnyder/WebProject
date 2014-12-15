SET SQL_SAFE_UPDATES = 0;
SET FOREIGN_KEY_CHECKS = 0;
delete from accounts;
delete from buddies;
SET SQL_SAFE_UPDATES = 1;
SET FOREIGN_KEY_CHECKS = 1;

#test accounts
insert into accounts(username, passphrase, account_type, fullname, email, birthday) values ("Stephen123", "b5688dd3ea591885147de8a26205d463b6a9f22f", "apprentice", "Stephen Tam", "tamsd1@gcc.edu", "1993-09-20");
insert into accounts(username, passphrase, account_type, fullname, email, birthday) values ("TestAccount", "6250625b226df62870ae23af8d3fac0760d71588", "apprentice", "Test Test", "test@test.test", "1998-05-15");
insert into accounts(username, passphrase, account_type, fullname, email, birthday) values ("Nathan", "fbf4ad778443b376327f0e7f6837cf08f9eb6ed7", "artist", "Nathan Snyder", "snyder@pretzels.com", "1992-09-03");
insert into accounts(username, passphrase, account_type, fullname, email, birthday) values ("Matt", "7bb2c666a11ddb154dab71d66032135bef778014", "artist", "Matt Adamo", "matt@matt.com", "1993-05-07");

#test buddies
#Stephen's friends
insert into buddies values ("Stephen123","TestAccount", true);
insert into buddies values ("Stephen123","Nathan", true);
#Nate's friends
insert into buddies values ("Nathan","Matt", false);
#Matt's friends
insert into buddies values ("Matt","TestAccount", true);
insert into buddies values ("Matt","Stephen123", true);

select * from accounts;
select * from buddies;