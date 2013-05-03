using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using Microsoft.Exchange.WebServices.Data;

namespace Otter.Sync
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                ServicePointManager.ServerCertificateValidationCallback = CertificateValidationCallBack;
                ExchangeService service = new ExchangeService(ExchangeVersion.Exchange2010_SP1);
                service.Credentials = new WebCredentials("colin.bob", "password", "maxxor");
                service.TraceEnabled = true;
                service.TraceFlags = TraceFlags.All;
                service.AutodiscoverUrl("colin.bob@maxxor.com");
                //service.Url = new Uri("https://msexchange.maxxor.local/ews/exchange.asmx");
                //ChangeCollection<ItemChange> itemChangeCollection = service.SyncFolderItems(new FolderId(WellKnownFolderName.Inbox), PropertySet.IdOnly, null, 12, SyncFolderItemsScope.NormalItems, null);
                //string sSyncState = itemChangeCollection.SyncState;
                //service.LoadPropertiesForItems(itemChangeCollection.Select(x => x.Item).ToList(), PropertySet.FirstClassProperties);
                //foreach (ItemChange itemChange in itemChangeCollection)
                //{
                    
                //    Console.WriteLine("ChangeType: " + itemChange.ChangeType.ToString());
                //    Console.WriteLine("ItemId: " + itemChange.ItemId.UniqueId);
                //    Console.WriteLine("Subject: " + itemChange.Item.Subject);
                //    Console.WriteLine("Body: " + itemChange.Item.Body);

                //    //TODO: Create item on the client.
                //}
                FindItemsResults<Item> foundItems = service.FindItems(WellKnownFolderName.Inbox, new ItemView(10));
                service.LoadPropertiesForItems(foundItems, PropertySet.FirstClassProperties);
                foreach (Item item in foundItems)
                {
                    Console.WriteLine("Body: {0}", item.Body); 
                }
            }
            catch (Exception err)
            {
                Console.WriteLine(err.Message);
            }
            finally {
                Console.ReadLine();
            }
        }

        private static bool CertificateValidationCallBack(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors)
        {
            return true;
            // If the certificate is a valid, signed certificate, return true.
            if (sslPolicyErrors == System.Net.Security.SslPolicyErrors.None)
            {
                return true;
            }

            // If there are errors in the certificate chain, look at each error to determine the cause.
            if ((sslPolicyErrors & System.Net.Security.SslPolicyErrors.RemoteCertificateChainErrors) != 0)
            {
                if (chain != null && chain.ChainStatus != null)
                {
                    foreach (System.Security.Cryptography.X509Certificates.X509ChainStatus status in chain.ChainStatus)
                    {
                        if ((certificate.Subject == certificate.Issuer) &&
                           (status.Status == System.Security.Cryptography.X509Certificates.X509ChainStatusFlags.UntrustedRoot))
                        {
                            // Self-signed certificates with an untrusted root are valid. 
                            continue;
                        }
                        else
                        {
                            if (status.Status != System.Security.Cryptography.X509Certificates.X509ChainStatusFlags.NoError)
                            {
                                // If there are any other errors in the certificate chain, the certificate is invalid,
                                // so the method returns false.
                                return false;
                            }
                        }
                    }
                }

                // When processing reaches this line, the only errors in the certificate chain are 
                // untrusted root errors for self-signed certificates. These certificates are valid
                // for default Exchange server installations, so return true.
                return true;
            }
            else
            {
                // In all other cases, return false.
                return false;
            }
        }

        private static bool RedirectionUrlValidationCallback(string redirectionUrl)
        {
            bool result = false;
            Uri redirectionUri = new Uri(redirectionUrl);
            if (redirectionUri.Scheme == "https")
            {
                result = true;
            }
            return result;
        }
    }
}
