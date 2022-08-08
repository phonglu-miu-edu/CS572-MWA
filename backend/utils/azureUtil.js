const {
    generateBlobSASQueryParameters,
    ContainerSASPermissions,
    StorageSharedKeyCredential
} = require('@azure/storage-blob');

/**
 * Extracts account name from the url
 * @param {string} url url to extract the account name from
 * @returns {string} with the account name
 */
const getAccountNameFromUrl = url => {
    const parsedUrl = URLBuilder.parse(url);
    let accountName;
    try {
        if (parsedUrl.getHost().split('.')[1] === 'blob') {
            // `${defaultEndpointsProtocol}://${accountName}.blob.${endpointSuffix}`;
            accountName = parsedUrl.getHost().split('.')[0];
        } else {
            // IPv4/IPv6 address hosts... Example - http://192.0.0.10:10001/devstoreaccount1/
            // Single word domain without a [dot] in the endpoint... Example - http://localhost:10001/devstoreaccount1/
            // .getPath() -> /devstoreaccount1/
            accountName = parsedUrl.getPath().split('/')[1];
        }
        if (!accountName) {
            throw new Error('Provided accountName is invalid.');
        }
        return accountName;
    } catch (error) {
        throw new Error('Unable to extract accountName with provided information.');
    }
};

const getValueInConnString = (connectionString, argument) => {
    const elements = connectionString.split(';');
    let _i = 0;
    const elements_1 = elements;
    for (; _i < elements_1.length; _i++) {
        const element = elements_1[_i];
        if (element.trim().startsWith(argument)) {
            return element.trim().match(argument + '=(.*)')[1];
        }
    }
    return '';
};

/**
 * Extracts the parts of an Azure Storage account connection string.
 *
 * @export
 * @param {string} connectionString Connection string.
 * @returns {{accountName: string, accountSas: (*|string), kind: string, url: (string|*|string)}}  String key value pairs of the storage account's url and credentials.
 */
const extractConnectionStringParts = connectionString => {
    let accountName;
    let proxyUri = '';

    // Matching BlobEndpoint in the Account connection string
    let blobEndpoint = getValueInConnString(connectionString, 'BlobEndpoint');
    // Slicing off '/' at the end if exists
    // (The methods that use `extractConnectionStringParts` expect the url to not have `/` at the end)
    blobEndpoint = blobEndpoint.endsWith('/') ? blobEndpoint.slice(0, -1) : blobEndpoint;
    if (connectionString.search('DefaultEndpointsProtocol=') !== -1 &&
        connectionString.search('AccountKey=') !== -1) {

        // Account connection string
        let defaultEndpointsProtocol = '';
        accountName = '';
        let endpointSuffix = '';

        // Get account name and key
        accountName = getValueInConnString(connectionString, 'AccountName');
        const accountKey = Buffer.from(getValueInConnString(connectionString, 'AccountKey'), 'base64');
        if (!blobEndpoint) {
            // BlobEndpoint is not present in the Account connection string
            // Can be obtained from `${defaultEndpointsProtocol}://${accountName}.blob.${endpointSuffix}`
            defaultEndpointsProtocol = getValueInConnString(connectionString, 'DefaultEndpointsProtocol');
            const protocol = defaultEndpointsProtocol.toLowerCase();
            if (protocol !== 'https' && protocol !== 'http') {
                throw new Error('Invalid DefaultEndpointsProtocol in the provided Connection String. Expecting \'https\' or \'http\'');
            }
            endpointSuffix = getValueInConnString(connectionString, 'EndpointSuffix');
            if (!endpointSuffix) {
                throw new Error('Invalid EndpointSuffix in the provided Connection String');
            }
            blobEndpoint = defaultEndpointsProtocol + '://' + accountName + '.blob.' + endpointSuffix;
        }
        if (!accountName) {
            throw new Error('Invalid AccountName in the provided Connection String');
        } else if (accountKey.length === 0) {
            throw new Error('Invalid AccountKey in the provided Connection String');
        }
        return {
            kind: 'AccountConnString',
            url: blobEndpoint,
            accountName: accountName,
            accountKey: accountKey,
            proxyUri: proxyUri
        };
    } else {
        // SAS connection string
        const accountSas = getValueInConnString(connectionString, 'SharedAccessSignature');
        accountName = getAccountNameFromUrl(blobEndpoint);

        if (!blobEndpoint) {
            throw new Error('Invalid BlobEndpoint in the provided SAS Connection String');
        } else if (!accountSas) {
            throw new Error('Invalid SharedAccessSignature in the provided SAS Connection String');
        } else if (!accountName) {
            throw new Error('Invalid AccountName in the provided SAS Connection String');
        }
        return { kind: 'SASConnString', url: blobEndpoint, accountName: accountName, accountSas: accountSas };
    }
};

const generateSasKey = (connectionString, container, permissions) => {
    const { accountKey, accountName, url } = extractConnectionStringParts(connectionString);
    const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey.toString('base64'));

    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 2);

    const sas = generateBlobSASQueryParameters({
        containerName: container,
        permissions: ContainerSASPermissions.parse(permissions),
        expiresOn: expiryDate
    }, sharedKeyCredential);

    return {
        sas: sas.toString(),
        url: url
    };
};

const getUploadUrl = filename => {
    const connectionString = process.env.BLOG_SERVICE_CONNECTION_STRING;
    const container = process.env.UPLOAD_BLOG_SERVICE_CONTAINER;
    const permissions = 'w';

    const { url, sas } = generateSasKey(connectionString, container, permissions);

    return {
        originUrl: url,
        fileUrl: `${url}/${container}/${filename}`,
        sasUrl: `${url}?${sas}`,
        filename,
        uploadContainer: container
    };
};

module.exports = {
    getUploadUrl
};