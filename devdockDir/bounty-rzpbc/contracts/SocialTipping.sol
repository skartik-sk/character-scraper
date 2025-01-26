// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SocialTipping is ReentrancyGuard {
    IERC20 public immutable token;
    
    struct Creator {
        uint256 totalTips;
        bool isRegistered;
    }
    
    mapping(address => Creator) public creators;
    mapping(address => mapping(address => uint256)) public tipHistory;
    
    event CreatorRegistered(address indexed creator);
    event TipSent(address indexed from, address indexed to, uint256 amount);
    
    constructor(address _token) {
        token = IERC20(_token);
    }
    
    function registerCreator() external {
        require(!creators[msg.sender].isRegistered, "Already registered");
        creators[msg.sender] = Creator(0, true);
        emit CreatorRegistered(msg.sender);
    }
    
    function tipCreator(address _creator, uint256 _amount) external nonReentrant {
        require(creators[_creator].isRegistered, "Creator not registered");
        require(_amount > 0, "Amount must be greater than 0");
        require(token.balanceOf(msg.sender) >= _amount, "Insufficient balance");
        
        require(token.transferFrom(msg.sender, _creator, _amount), "Transfer failed");
        
        creators[_creator].totalTips += _amount;
        tipHistory[msg.sender][_creator] += _amount;
        
        emit TipSent(msg.sender, _creator, _amount);
    }
    
    function getCreatorTips(address _creator) external view returns (uint256) {
        return creators[_creator].totalTips;
    }
    
    function getTipHistory(address _tipper, address _creator) external view returns (uint256) {
        return tipHistory[_tipper][_creator];
    }
}