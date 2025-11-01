

## Blockchain-Based Supply Chain Tracking System

A transparent, tamper-proof solution to trace agricultural products from Farm to Packaging using Ethereum Smart Contracts.

## Overview

This project provides an end-to-end blockchain solution for tracking agricultural products throughout the supply chain — from the Farmer, to the Supplier (Processor), to the Packager.

Each stage is securely recorded on the Ethereum blockchain to ensure authenticity, traceability, and transparency of food products.

✅ Built with Solidity
✅ Deployed via Remix / Hardhat
✅ Interacts with Web3 / Ethers.js Frontend

## Key Features

Immutable Product Tracking:
Every product batch is stored on the blockchain, ensuring data cannot be altered.

Stage-Based Progression:
Products move through predefined stages — Farmer → Supplier → Packaged.

Decentralized Verification:
Each participant signs their actions via their own Ethereum wallet.

Real-Time Data Access:
Anyone can query product information via the contract address.

Event-Driven Updates:
Blockchain emits events (ProductCreated, ProductProcessed, ProductPackaged) for transparent activity logs.

# Features
 Create Agricultural Batches - Register new product batches

 Update Logistics - Add processing and transportation details

 Retail Information - Add packaging and certification details

 Status Tracking - Real-time status updates

 Transparent History - Immutable record of product journey

 One-User Management - Single interface for all roles

## How to Run
## Compile & Deploy

Open Remix IDE

Paste SupplyChain.sol code

Compile with Solidity 0.8.19

Deploy to Remix VM (London) or Injected Provider (Metamask)

##  Interact with Functions

After deployment:

Call createProduct() → add a new harvested crop

### Live Link

Live Link : https://verification-of-farming.vercel.app/

Call processProduct() → simulate supplier actions

Call packageProduct() → finalize and mark product as packaged

Call getProduct() → view complete details of a product
