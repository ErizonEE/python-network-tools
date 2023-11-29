import nmap;

schanner = nmap.PortScanner();

target_address = input("Dirección IP a escanear: ");
print("El escaneo suele llevar un tiempo, ten paciencia :-)");
print("Escaneando IP: ", target_address);

schanner.scan(target_address);

print("Ips encontradas: ", schanner.all_hosts());

