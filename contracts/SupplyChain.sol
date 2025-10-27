// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SupplyChain {
    enum Stage { Farmer, Supplier, Packaged }

    struct FarmerInfo {
        string crop;
        string harvestDate;
        string location;
        string quality;
    }

    struct SupplierInfo {
        string processingDate;
        string millName;
        string batchNumber;
        string weight;
    }

    struct PackageInfo {
        string packagingDate;
        string brand;
        string shelfLife;
    }

    struct Product {
        uint256 id;
        FarmerInfo farmerData;
        SupplierInfo supplierData;
        PackageInfo packageData;
        Stage currentStage;
        address farmer;
        address supplier;
        address packager;
        bool exists;
    }

    mapping(uint256 => Product) public products;
    uint256 public productCount;

    event ProductCreated(uint256 indexed id, address indexed farmer);
    event ProductProcessed(uint256 indexed id, address indexed supplier);
    event ProductPackaged(uint256 indexed id, address indexed packager);

    
    function createProduct(
        string memory _crop,
        string memory _harvestDate,
        string memory _location,
        string memory _quality
    ) public returns (uint256) {
        productCount++;

        Product storage p = products[productCount];
        p.id = productCount;
        p.farmerData = FarmerInfo(_crop, _harvestDate, _location, _quality);
        p.currentStage = Stage.Farmer;
        p.farmer = msg.sender;
        p.exists = true;

        emit ProductCreated(productCount, msg.sender);
        return productCount;
    }

    
    function processProduct(
        uint256 _id,
        string memory _processingDate,
        string memory _millName,
        string memory _batchNumber,
        string memory _weight
    ) public {
        Product storage product = products[_id];
        require(product.exists, "Product does not exist");
        require(product.currentStage == Stage.Farmer, "Invalid stage");

        product.supplierData = SupplierInfo(_processingDate, _millName, _batchNumber, _weight);
        product.currentStage = Stage.Supplier;
        product.supplier = msg.sender;

        emit ProductProcessed(_id, msg.sender);
    }

    
    function packageProduct(
        uint256 _id,
        string memory _packagingDate,
        string memory _brand,
        string memory _shelfLife
    ) public {
        Product storage product = products[_id];
        require(product.exists, "Product does not exist");
        require(product.currentStage == Stage.Supplier, "Invalid stage");

        product.packageData = PackageInfo(_packagingDate, _brand, _shelfLife);
        product.currentStage = Stage.Packaged;
        product.packager = msg.sender;

        emit ProductPackaged(_id, msg.sender);
    }

    
    function getProduct(uint256 _id) public view returns (Product memory) {
        require(products[_id].exists, "Product does not exist");
        return products[_id];
    }
}

