FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY TodoApi/TodoApi.csproj TodoApi/
RUN dotnet restore TodoApi/TodoApi.csproj

COPY TodoApi/ TodoApi/
RUN dotnet publish TodoApi/TodoApi.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 3000
ENTRYPOINT ["dotnet", "TodoApi.dll"]
