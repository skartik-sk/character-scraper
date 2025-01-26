import BountyContract from 0x9d2ade18cb6bea1a

pub fun main(address: Address): BountyContract.BountyInfo? {
    return BountyContract.getBounty(address: address)
}