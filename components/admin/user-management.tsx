"use client";

import { useState } from "react";
import { Search, Coins, X } from "lucide-react";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  tier: "Starter" | "Creator" | "Pro";
  credits: number;
  joinedDate: string;
  status: "Active" | "Suspended";
  role: "User" | "Admin";
}

const INITIAL_USERS: UserRecord[] = [
  {
    id: "usr_101",
    name: "Amara Chukwu",
    email: "amara@nollywoodfilm.com",
    tier: "Pro",
    credits: 1240,
    joinedDate: "Aug 14, 2026",
    status: "Active",
    role: "Admin",
  },
  {
    id: "usr_102",
    name: "Tunde Bakare",
    email: "tunde@afrobeatstudio.ng",
    tier: "Creator",
    credits: 320,
    joinedDate: "Aug 18, 2026",
    status: "Active",
    role: "User",
  },
  {
    id: "usr_103",
    name: "Amina Bello",
    email: "amina@hausamedia.com",
    tier: "Starter",
    credits: 45,
    joinedDate: "Aug 22, 2026",
    status: "Active",
    role: "User",
  },
  {
    id: "usr_104",
    name: "Kofi Mensah",
    email: "kofi@accracreative.gh",
    tier: "Creator",
    credits: 580,
    joinedDate: "Aug 24, 2026",
    status: "Active",
    role: "User",
  },
  {
    id: "usr_105",
    name: "Nia Osei",
    email: "nia@swahilipodcast.ke",
    tier: "Pro",
    credits: 2150,
    joinedDate: "Aug 25, 2026",
    status: "Active",
    role: "User",
  },
];

export function UserManagement() {
  const [users, setUsers] = useState<UserRecord[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [grantAmount, setGrantAmount] = useState<number>(100);
  const [showModal, setShowModal] = useState(false);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleGrantCredits = (amountToAdd: number) => {
    if (!selectedUser) return;
    setUsers((prev) =>
      prev.map((u) => (u.id === selectedUser.id ? { ...u, credits: u.credits + amountToAdd } : u))
    );
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
        <div>
          <h3 className="font-bold text-darktext text-base">Users & Credit Balances</h3>
          <p className="text-xs text-neutral-500">Manage creator accounts and grant credits.</p>
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search creator name or email..."
            className="w-full pl-8 pr-4 py-1.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-berry/20"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-darktext">
          <thead className="text-neutral-500 font-semibold uppercase text-[10px] border-b border-neutral-200">
            <tr>
              <th className="py-2.5 px-3">Name</th>
              <th className="py-2.5 px-3">Plan Tier</th>
              <th className="py-2.5 px-3">Credits</th>
              <th className="py-2.5 px-3">Joined</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-neutral-50 transition-colors">
                <td className="py-3 px-3">
                  <div className="font-semibold text-darktext">{user.name}</div>
                  <div className="text-[11px] text-neutral-500">{user.email}</div>
                </td>

                <td className="py-3 px-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 font-semibold text-[11px] text-neutral-700">
                    {user.tier}
                  </span>
                </td>

                <td className="py-3 px-3 font-bold text-berry">{user.credits}</td>

                <td className="py-3 px-3 text-neutral-500">{user.joinedDate}</td>

                <td className="py-3 px-3 text-right">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowModal(true);
                    }}
                    className="px-3 py-1 rounded-lg bg-berry/10 text-berry hover:bg-berry hover:text-white font-semibold text-xs transition-colors"
                  >
                    + Add Credits
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Grant Credits Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-darktext text-sm">Add Credits to {selectedUser.name}</h4>
              <button onClick={() => setShowModal(false)} className="text-neutral-400 hover:text-darktext">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-neutral-500 font-medium">Select Amount</label>
              <div className="grid grid-cols-4 gap-2">
                {[50, 100, 250, 500].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setGrantAmount(amt)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                      grantAmount === amt
                        ? "bg-berry text-white border-berry"
                        : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50"
                    }`}
                  >
                    +{amt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3.5 py-1.5 rounded-xl bg-neutral-100 text-neutral-600 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleGrantCredits(grantAmount)}
                className="px-4 py-1.5 rounded-xl bg-berry text-white text-xs font-semibold hover:bg-berry-hover shadow-xs"
              >
                Add {grantAmount}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
