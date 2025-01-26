import BountyContract from 0x9d2ade18cb6bea1a

transaction(amount: UFix64, isPublic: Bool, deadline: UFix64, bountiesLeft: Int) {
    prepare(signer: AuthAccount) {
        BountyContract.createBounty(amount: amount, isPublic: isPublic, deadline: deadline, bountiesLeft: bountiesLeft)
    }
}