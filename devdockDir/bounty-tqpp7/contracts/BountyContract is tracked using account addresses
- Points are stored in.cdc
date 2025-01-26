a vector
- All operations are protecteaccess(all) contract BountyContract {

    access(alld with appropriate access controls
- The module is) struct BountyInfo  tested with basic unit tests

Remember to replace{
        access(all) let `default` in the function IDs with amount: UFix64
        access(all) let isPublic: Bool
        access(all your actual account address when running the commands.

This) let createdBy: Address
        access(all) let deadline: UFix64\ implementation provides a basic foundation for pathn        access(all) let bountiesLeft: Int
\ management that you can extend withn        init(amount: UFix64 additional features like:
- Path, isPublic: Bool, createdBy: Address, deadline: UFix64, b visualization
- Path optimization
- Multiple paths per account
- Path sharing between accountsountiesLeft: Int) {
            self.amount = amount
            self.isPublic = isPublic
            self.createdBy = createdBy
            self.deadline = deadline
            self.bountiesLeft = bountiesLeft
        }
    }

    access(all) let bounties: {Address: BountyInfo}

    init() {
        self.bounties = {}
    }

    access(all) fun createBounty(amount: UFix64, isPublic: Bool, deadline: UFix64, bountiesLeft: Int) {
        let bounty = BountyInfo(
            amount: amount,
            isPublic: isPublic,
            createdBy: self.account.address,
            deadline: deadline,
            bountiesLeft: bountiesLeft
        )
        self.bounties[self.account.address] = bounty
    }

    access(all) fun getBounty(address: Address): BountyInfo? {
        return self.bounties[address]
    }
}