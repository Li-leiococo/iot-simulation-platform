var builder = DistributedApplication.CreateBuilder(args);

var apiService = builder.AddProject<Projects.IoTSimAspire_ApiService>("apiservice");

builder.AddProject<Projects.IoTSimAspire_Web>("webfrontend")
    .WithExternalHttpEndpoints()
    .WithReference(apiService);

builder.Build().Run();
