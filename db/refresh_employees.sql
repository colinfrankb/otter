alter procedure dbo.refresh_employees
as
begin
	declare @currentDate datetime
	set @currentDate = GETDATE()
	
	update dbo.Employee set 
	[status] = 'In', 
	[start_date] = null, 
	end_date = null,
	eta = null,
	reason = '',
	last_updated = @currentDate
	where @currentDate > end_date
end

dbo.refresh_employees