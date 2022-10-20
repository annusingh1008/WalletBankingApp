package com.walletBankingApp.walletbankingapp.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Date;

@Document(collection = "Transactions")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TransactionEntity {

    public String email;
    public double amount;
    public String type;
    public double transferAmount;
    public String from_name;
    public String to_name;
    public Date date;
}
