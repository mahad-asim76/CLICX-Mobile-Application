using CLICX.Web.Service.Clients.Common;
using Entities.Common;
using Entities.Common.Constants;
using Newtonsoft.Json.Linq;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace CLICX.Web.Service.Clients.Cache
{
    public interface ICacheService
    {
        void Set<T>(string key, T value);
        T Get<T>(string key);
    }
    public class CacheMemory : ICacheService
    {
        private readonly ConnectionMultiplexer _connection;
        private readonly IDatabase _cache;

        public CacheMemory(string connectionString)
        {
            _connection = ConnectionMultiplexer.Connect(connectionString);
            _cache = _connection.GetDatabase();
        }
        public void Set<T>(string key, T value)
        {
            if (Configuration.EnableCache == "0")
                return;

            if (typeof(T) == typeof(DataSet) || typeof(T) == typeof(DataTable))
            {
                DataSet ds = new DataSet();

                if (typeof(T) == typeof(DataTable))
                {
                    var dataTable = value as DataTable;
                    ds.Tables.Add(dataTable.Copy());
                }

                else
                    ds = value as DataSet;

                //var serializedValue = ds.Tables.Cast<DataTable>()
                //                                    .Select(table => table.Rows.Cast<DataRow>()
                //                                    .Select(row => table.Columns.Cast<DataColumn>()
                //                                    .ToDictionary(column => column.ColumnName, column => row[column]))
                //                                    .ToList())
                //                                    .ToList();
                try
                {
                    //_cache.StringSet(key, JsonSerializer.Serialize(serializedValue), TimeSpan.FromMinutes(ApplicationConstants.CacheConstants.CacheTimeout), When.NotExists);

                    var schema = ds.GetXmlSchema();
                    _cache.StringSet(key + ":schema", schema, TimeSpan.FromMinutes(AppConstants.CacheConstants.CacheTimeout));

                    // Serialize DataTable data
                    var serializedValue = ds.GetXml();
                    _cache.StringSet(key + ":data", serializedValue, TimeSpan.FromMinutes(AppConstants.CacheConstants.CacheTimeout));

                    LoggingService.Logger.Information($"Dataset {AppConstants.CacheConstants.CacheSerializeSuccess} '{key}'");
                }
                catch (Exception ex)
                {
                    LoggingService.Logger.Error($"{AppConstants.CacheConstants.CacheSerializeError} '{key}': {ex.Message}");
                }
            }
            else
            {
                try
                {
                    var serializedValue = JsonSerializer.Serialize(value);
                    _cache.StringSet(key, serializedValue, TimeSpan.FromMinutes(AppConstants.CacheConstants.CacheTimeout));
                    LoggingService.Logger.Information($"{AppConstants.CacheConstants.CacheSerializeSuccess} '{key}' : '{serializedValue}'");
                }
                catch (Exception ex)
                {
                    LoggingService.Logger.Error($"{AppConstants.CacheConstants.CacheSerializeError} '{key}' : '{value}': {ex.Message}");
                }
            }

        }

        //public T Get<T>(string key)
        //{
        //    if (Configuration.EnableCache == "0")
        //        return default(T);

        //    var serializedValue = _cache.StringGet(key);

        //    if (serializedValue.IsNullOrEmpty)
        //    {
        //        LoggingService.Logger.Information($"{AppConstants.CacheConstants.NoDataForKey} '{key}'");
        //        return default(T);
        //    }

        //    if (typeof(T).IsEqual(typeof(DataSet)) || typeof(T) == typeof(DataTable))
        //    {
        //        try
        //        {
        //            var deserializedValue = new DataSet();

        //            var dataTableList = JsonSerializer.Deserialize<List<List<Dictionary<string, object>>>>(serializedValue);

        //            foreach (var dataTableData in dataTableList)
        //            {
        //                var dataTable = new DataTable();
        //                foreach (var columnData in dataTableData.First())
        //                {
        //                    dataTable.Columns.Add(columnData.Key);
        //                }
        //                foreach (var rowData in dataTableData)
        //                {
        //                    var row = dataTable.NewRow();
        //                    foreach (var columnData in rowData)
        //                    {
        //                        if (columnData.Value.IsNotNull() && columnData.Value.ToString() == "{}")
        //                        {
        //                            row[columnData.Key].IsNull(); // replace {} with null
        //                        }
        //                        else
        //                        {
        //                            row[columnData.Key] = columnData.Value;
        //                        }
        //                    }
        //                    dataTable.Rows.Add(row);
        //                }
        //                deserializedValue.Tables.Add(dataTable);
        //            }

        //            LoggingService.Logger.Information($"{AppConstants.CacheConstants.CacheDeserializeSuccess} '{key}': {deserializedValue}");

        //            if (typeof(T).Equals(typeof(DataTable)))
        //            {
        //                if (deserializedValue?.Tables.Count > 0)
        //                {
        //                    var firstTable = deserializedValue.Tables[0];
        //                    return (T)(object)firstTable;
        //                }
        //            }

        //            return (T)(object)deserializedValue;
        //        }
        //        catch (Exception ex)
        //        {
        //            LoggingService.Logger.Error($"{AppConstants.CacheConstants.CacheDeserializeError} '{key}': {ex.Message}");
        //            return default(T);
        //        }
        //    }

        //    else
        //    {
        //        try
        //        {
        //            var deserializedValue = JsonSerializer.Deserialize<T>(serializedValue);
        //            LoggingService.Logger.Information($"{AppConstants.CacheConstants.CacheDeserializeSuccess}'{key}': {deserializedValue}");
        //            return deserializedValue;
        //        }
        //        catch (Exception ex)
        //        {
        //            LoggingService.Logger.Error($"{AppConstants.CacheConstants.CacheDeserializeError} '{key}' from cache: {ex.Message}");
        //            return default(T);
        //        }
        //    }

        //    var totalCacheMemory = CurrentlyUsedCacheMemory();
        //    LoggingService.Logger.Information(AppConstants.CacheConstants.CacheCurrentMemoryUsage, totalCacheMemory.totalCacheMemoryUsed);
        //}

        public T Get<T>(string key)
        {
            if (Configuration.EnableCache == "0")
                return default(T);

            if (typeof(T) == typeof(DataSet) || typeof(T) == typeof(DataTable))
            {

                var serializedSchema = _cache.StringGet(key + ":schema");
                var serializedData = _cache.StringGet(key + ":data");

                try
                {
                    var deserializedDataSet = new DataSet();

                    // Deserialize schema and apply to the DataSet
                    deserializedDataSet.ReadXmlSchema(new StringReader(serializedSchema));

                    // Deserialize data and apply to the DataSet
                    deserializedDataSet.ReadXml(new StringReader(serializedData));

                    LoggingService.Logger.Information($"{AppConstants.CacheConstants.CacheDeserializeSuccess} '{key}'");

                    if (typeof(T) == typeof(DataTable))
                    {
                        if (deserializedDataSet.Tables.Count > 0)
                        {
                            var firstTable = deserializedDataSet.Tables[0];
                            return (T)(object)firstTable;
                        }
                    }

                    return (T)(object)deserializedDataSet;
                }
                catch (Exception ex)
                {
                    LoggingService.Logger.Error($"{AppConstants.CacheConstants.CacheDeserializeError} '{key}': {ex.Message}");
                    return default(T);
                }
            }
            else
            {
                try
                {
                    var serializedValue = _cache.StringGet(key);
                    var deserializedValue = JsonSerializer.Deserialize<T>(serializedValue);
                    LoggingService.Logger.Information($"{AppConstants.CacheConstants.CacheDeserializeSuccess} '{key}': {deserializedValue}");
                    return deserializedValue;
                }
                catch (Exception ex)
                {
                    LoggingService.Logger.Error($"{AppConstants.CacheConstants.CacheDeserializeError} '{key}' from cache: {ex.Message}");
                    return default(T);
                }
            }
        }


        public void ClearCache()
        {
            // Clear all cache from Redis
            _cache.Execute("FLUSHDB");
        }

        public void DeleteRecordFromCache(string sessionIdToDelete)
        {
            var existingData = Get<DataTable>(AppConstants.CacheConstants.UniqueKey);

            if (existingData != null)
            {
                DataRow[] rowsToDelete = existingData.Select($"SessionID = '{sessionIdToDelete}'");

                foreach (DataRow row in rowsToDelete)
                {
                    existingData.Rows.Remove(row);
                }

                Set<DataTable>(AppConstants.CacheConstants.UniqueKey, existingData);
            }
            else
            {
                Console.WriteLine("Cache does not contain any data.");
            }
        }


        #region HelperMethods

        public CacheParams CurrentlyUsedCacheMemory()
        {
            CacheParams cacheParams = new CacheParams();

            // Call the INFO command to get information about Redis
            var info = _cache.Execute("INFO", "memory");

            // Parse the result to get the current memory usage
            var lines = info.ToString().Split(new[] { '\r', '\n' }, StringSplitOptions.RemoveEmptyEntries);

            cacheParams.totalCacheMemoryAllocated.Append(lines.FirstOrDefault(line => line.StartsWith("maxmemory_human:"))?.Split(':')[1]);
            cacheParams.totalCacheMemoryUsed.Append(lines.FirstOrDefault(line => line.StartsWith("used_memory_human:"))?.Split(':')[1]);

            return cacheParams;
        }

        #endregion

    }
}
