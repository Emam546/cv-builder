function HeaderComponent({
    name = "",
    subName = "",
}: {
    name?: string;
    subName?: string;
}) {
    <div className="font-bold group-hover:text-blue-60">
        <p className="font-bold group-hover:text-blue-60">
            {name || "(Not Specified)"}
        </p>
        <p className="text-sm text-neutral-50">{subName}</p>
    </div>;
}
