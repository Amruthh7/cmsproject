import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const TestContentstack = () => {
  const [testResults, setTestResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const testDirectAPI = async () => {
    setIsLoading(true);
    try {
      const apiKey = 'blt755dc6238a6bbc27';
      const deliveryToken = 'cs05eb74f9e80cece6d90fd6e3';
      const environment = 'cmsproject';
      
      // Test 1: Get all entries
      const entriesUrl = `https://cdn.contentstack.io/v3/content_types/about_page/entries?environment=${environment}&access_token=${deliveryToken}`;
      
      console.log('Testing entries API call to:', entriesUrl);
      
      const entriesResponse = await fetch(entriesUrl);
      const entriesData = await entriesResponse.json();
      
      // Test 2: If we have entries, try to get a specific entry
      let singleEntryData = null;
      if (entriesData.entries && entriesData.entries.length > 0) {
        const entryUid = entriesData.entries[0].uid;
        const singleEntryUrl = `https://cdn.contentstack.io/v3/content_types/about_page/entries/${entryUid}?environment=${environment}&access_token=${deliveryToken}`;
        
        console.log('Testing single entry API call to:', singleEntryUrl);
        
        const singleEntryResponse = await fetch(singleEntryUrl);
        singleEntryData = await singleEntryResponse.json();
      }
      
      setTestResults({
        type: 'Direct API',
        entriesUrl,
        entriesStatus: entriesResponse.status,
        entriesData: entriesData,
        singleEntryData: singleEntryData,
        success: entriesResponse.ok
      });
      
      console.log('Entries API result:', entriesData);
      console.log('Single entry result:', singleEntryData);
    } catch (error) {
      console.error('Direct API error:', error);
      setTestResults({
        type: 'Direct API',
        error: error.message,
        success: false
      });
    }
    setIsLoading(false);
  };

  const testAllEnvironments = async () => {
    setIsLoading(true);
    const environments = ['cmsproject', 'production', 'development', 'staging'];
    const results = [];
    
    for (const env of environments) {
      try {
        const url = `https://cdn.contentstack.io/v3/content_types/about_page/entries?environment=${env}&access_token=cs05eb74f9e80cece6d90fd6e3`;
        const response = await fetch(url);
        const data = await response.json();
        
        results.push({
          environment: env,
          status: response.status,
          success: response.ok,
          entriesCount: data.entries?.length || 0,
          data: data,
          errorMessage: data.error_message || null
        });
        
        console.log(`Environment ${env}:`, data);
      } catch (error) {
        results.push({
          environment: env,
          error: error.message,
          success: false
        });
      }
    }
    
    setTestResults({
      type: 'All Environments',
      results
    });
    setIsLoading(false);
  };

  const testContentTypes = async () => {
    setIsLoading(true);
    const contentTypes = ['about_page', 'about-page', 'aboutpage', 'about'];
    const results = [];
    
    for (const contentType of contentTypes) {
      try {
        const url = `https://cdn.contentstack.io/v3/content_types/${contentType}/entries?environment=cmsproject&access_token=cs05eb74f9e80cece6d90fd6e3`;
        const response = await fetch(url);
        const data = await response.json();
        
        results.push({
          contentType,
          status: response.status,
          success: response.ok,
          entriesCount: data.entries?.length || 0,
          data: data,
          errorMessage: data.error_message || null
        });
        
        console.log(`Content Type ${contentType}:`, data);
      } catch (error) {
        results.push({
          contentType,
          error: error.message,
          success: false
        });
      }
    }
    
    setTestResults({
      type: 'Content Types',
      results
    });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Contentstack Connection Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button 
            onClick={testDirectAPI} 
            disabled={isLoading}
            className="w-full"
          >
            Test Direct API
          </Button>
          <Button 
            onClick={testAllEnvironments} 
            disabled={isLoading}
            variant="outline"
            className="w-full"
          >
            Test All Environments
          </Button>
          <Button 
            onClick={testContentTypes} 
            disabled={isLoading}
            variant="outline"
            className="w-full"
          >
            Test Content Types
          </Button>
        </div>

        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2">Testing...</p>
          </div>
        )}

        {testResults && (
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Test Results: {testResults.type}</h2>
            
            {testResults.type === 'Direct API' && (
              <div>
                <p><strong>Entries URL:</strong> {testResults.entriesUrl}</p>
                <p><strong>Entries Status:</strong> {testResults.entriesStatus}</p>
                <p><strong>Success:</strong> {testResults.success ? 'Yes' : 'No'}</p>
                {testResults.error && (
                  <p className="text-red-500"><strong>Error:</strong> {testResults.error}</p>
                )}
                
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Entries Response:</h3>
                  <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto max-h-64">
                    {JSON.stringify(testResults.entriesData, null, 2)}
                  </pre>
                </div>

                {testResults.singleEntryData && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Single Entry Response:</h3>
                    <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto max-h-64">
                      {JSON.stringify(testResults.singleEntryData, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {testResults.type === 'All Environments' && (
              <div>
                {testResults.results.map((result: any, index: number) => (
                  <div key={index} className="mb-4 p-4 border rounded">
                    <h3 className="font-semibold">{result.environment}</h3>
                    <p><strong>Status:</strong> {result.status}</p>
                    <p><strong>Success:</strong> {result.success ? 'Yes' : 'No'}</p>
                    <p><strong>Entries Count:</strong> {result.entriesCount}</p>
                    {result.errorMessage && (
                      <p className="text-red-500"><strong>API Error:</strong> {result.errorMessage}</p>
                    )}
                    {result.error && (
                      <p className="text-red-500"><strong>Network Error:</strong> {result.error}</p>
                    )}
                    {result.success && result.entriesCount > 0 && (
                      <div className="mt-2">
                        <h4 className="font-semibold">Sample Entry:</h4>
                        <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-32">
                          {JSON.stringify(result.data.entries[0], null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {testResults.type === 'Content Types' && (
              <div>
                {testResults.results.map((result: any, index: number) => (
                  <div key={index} className="mb-4 p-4 border rounded">
                    <h3 className="font-semibold">{result.contentType}</h3>
                    <p><strong>Status:</strong> {result.status}</p>
                    <p><strong>Success:</strong> {result.success ? 'Yes' : 'No'}</p>
                    <p><strong>Entries Count:</strong> {result.entriesCount}</p>
                    {result.errorMessage && (
                      <p className="text-red-500"><strong>API Error:</strong> {result.errorMessage}</p>
                    )}
                    {result.error && (
                      <p className="text-red-500"><strong>Network Error:</strong> {result.error}</p>
                    )}
                    {result.success && result.entriesCount > 0 && (
                      <div className="mt-2">
                        <h4 className="font-semibold">Sample Entry:</h4>
                        <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-32">
                          {JSON.stringify(result.data.entries[0], null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
          <h3 className="font-semibold text-blue-800 mb-2">Troubleshooting Tips:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Check if entries are published to the correct environment</li>
            <li>• Verify the content type name matches exactly</li>
            <li>• Ensure the delivery token has proper permissions</li>
            <li>• Check browser console (F12) for detailed error logs</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestContentstack;